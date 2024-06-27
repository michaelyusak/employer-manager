import { Injectable } from '@nestjs/common';
import { getFromElastic } from 'src/hooks/elsticsearch';
import { EmployeeResponse } from './entities/employee.entity';

@Injectable()
export class EmployeeService {
  private dotenv = require('dotenv');

  async count() {
    this.dotenv.config();

    const responseData = await getFromElastic<{ count: number }>(
      process.env.ELASTICSEARCHURL + '_count',
    );

    return { count: responseData.count };
  }

  async findAverageSalary() {
    this.dotenv.config();

    let limit = (await this.count()).count;

    if (limit == 0) {
      return 0;
    }

    const totalEmployee = limit;
    let totalSalary = 0;

    while (limit > 0) {
      const responseData = await getFromElastic<EmployeeResponse>(
        process.env.ELASTICSEARCHURL +
          `_search?size=${limit > 10000 ? 10000 : limit}`,
        JSON.stringify({
          query: {
            match_all: {},
          },
        }),
      );

      responseData.hits.hits.forEach((employee) => {
        totalSalary += +employee._source.Salary;
      });

      limit -= 10000;
    }

    return { average_salary: totalSalary / totalEmployee };
  }

  async findAgeDistribution() {
    this.dotenv.config();

    let limit = (await this.count()).count;

    if (limit == 0) {
      return {};
    }

    const ageDistribution: { [age: number]: { count: number } } = {};

    while (limit > 0) {
      const responseData = await getFromElastic<EmployeeResponse>(
        process.env.ELASTICSEARCHURL +
          `_search?size=${limit > 10000 ? 10000 : limit}`,
        JSON.stringify({
          query: {
            match_all: {},
          },
        }),
      );

      responseData.hits.hits.forEach((employee) => {
        if (ageDistribution[employee._source.Age]) {
          ageDistribution[employee._source.Age].count += 1;
        } else {
          ageDistribution[employee._source.Age] = { count: 1 };
        }
      });

      limit -= 10000;
    }

    return { age_distribution: ageDistribution };
  }

  async findMaritalStatusDistribution() {
    this.dotenv.config();

    let limit = (await this.count()).count;

    if (limit == 0) {
      return {};
    }

    const maritalStatusDistribution: {
      [marital_status: string]: { count: number };
    } = {};

    while (limit > 0) {
      const responseData = await getFromElastic<EmployeeResponse>(
        process.env.ELASTICSEARCHURL +
          `_search?size=${limit > 10000 ? 10000 : limit}`,
        JSON.stringify({
          query: {
            match_all: {},
          },
        }),
      );

      responseData.hits.hits.forEach((employee) => {
        if (maritalStatusDistribution[employee._source.MaritalStatus]) {
          maritalStatusDistribution[employee._source.MaritalStatus].count += 1;
        } else {
          maritalStatusDistribution[employee._source.MaritalStatus] = {
            count: 1,
          };
        }
      });

      limit -= 10000;
    }

    return { marital_status_distribution: maritalStatusDistribution };
  }
}
