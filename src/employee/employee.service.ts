import { Injectable } from '@nestjs/common';
import { getFromElastic } from 'src/hooks/elsticsearch';
@Injectable()
export class EmployeeService {
  private dotenv = require('dotenv');

  async count() {
    this.dotenv.config();

    const responseData = await getFromElastic(
      process.env.ELASTICSEARCHURL + '_count',
    );

    return { count: responseData.count };
  }

  async findAverageSalary() {
    this.dotenv.config();

    const responseData = await getFromElastic(
      process.env.ELASTICSEARCHURL + '_search',
      JSON.stringify({
        aggs: {
          average_salary: {
            avg: {
              field: 'Salary',
            },
          },
        },
      }),
    );

    return { average_salary: responseData.aggregations.average_salary.value };
  }

  async findAgeDistribution() {
    this.dotenv.config();

    const responseData = await getFromElastic(
      process.env.ELASTICSEARCHURL + '_search',
      JSON.stringify({
        size: 0,
        aggs: {
          age_distribution: {
            terms: {
              field: 'Age',
            },
          },
        },
      }),
    );

    return {
      age_distribution: responseData.aggregations.age_distribution.buckets,
    };
  }

  async findMaritalStatusDistribution() {
    this.dotenv.config();

    const responseData = await getFromElastic(
      process.env.ELASTICSEARCHURL + '_search',
      JSON.stringify({
        aggs: {
          marital_status_distribution: {
            terms: {
              field: 'MaritalStatus',
            },
          },
        },
      }),
    );

    return {
      marital_status_distribution:
        responseData.aggregations.marital_status_distribution.buckets,
    };
  }

  async findDateOfJoiningHistogram(interval: string) {
    this.dotenv.config();

    return getFromElastic(
      process.env.ELASTICSEARCHURL + '_search',
      JSON.stringify({
        size: 0,
        aggs: {
          date_of_joining_histogram: {
            date_histogram: {
              field: 'DateOfJoining',
              interval: interval,
              format: 'yyyy-MM-dd',
            },
          },
        },
      }),
    );
  }

  async findGenderDistribution() {
    this.dotenv.config();

    const responseData = await getFromElastic(
      process.env.ELASTICSEARCHURL + '_search',
      JSON.stringify({
        aggs: {
          gender_distribution: {
            terms: {
              field: 'Gender',
            },
          },
        },
      }),
    );

    return {
      gender_distribution:
        responseData.aggregations.gender_distribution.buckets,
    };
  }

  async findSalaryRange() {
    this.dotenv.config();

    const responseData = await getFromElastic(
      process.env.ELASTICSEARCHURL + '_search',
      JSON.stringify({
        size: 0,
        aggs: {
          max_salary: {
            max: {
              field: 'Salary',
            },
          },
          min_salary: {
            min: {
              field: 'Salary',
            },
          },
        },
      }),
    );

    return {
      salary_range: {
        min: responseData.aggregations.min_salary.value,
        max: responseData.aggregations.max_salary.value,
      },
    };
  }

  async findDesignationDistribution() {
    this.dotenv.config();

    const responseData = await getFromElastic(
      process.env.ELASTICSEARCHURL + '_search',
      JSON.stringify({
        aggs: {
          designation_distribution: {
            terms: {
              field: 'Designation',
            },
          },
        },
      }),
    );

    return {
      designation_distribution:
        responseData.aggregations.designation_distribution.buckets,
    };
  }
}
