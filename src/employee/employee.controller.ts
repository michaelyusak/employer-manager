import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get('count')
  count() {
    return this.employeeService.count();
  }

  @Get('average-salary')
  getAverage() {
    return this.employeeService.findAverageSalary();
  }

  @Get('age-distribution')
  getAgeDistribution() {
    return this.employeeService.findAgeDistribution();
  }

  @Get('marital-status-distribution')
  getMaritalStatusDistribution() {
    return this.employeeService.findMaritalStatusDistribution();
  }

  @Get('date-of-joining-histogram/')
  getDateOfJoiningHistogram(@Query('interval') interval: string) {
    if (interval == '' || !interval) {
      interval = 'month';
    } else if (interval != 'month' && interval != 'year') {
      throw new HttpException(
        'interval can only be either "year" or "month"',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.employeeService.findDateOfJoiningHistogram(interval);
  }

  @Get('gender-distribution')
  getGenderDistribution() {
    return this.employeeService.findGenderDistribution();
  }

  @Get('salary-range')
  getSalaryRange() {
    return this.employeeService.findSalaryRange();
  }

  @Get('designation-distribution')
  getDesignationDistribution() {
    return this.employeeService.findDesignationDistribution();
  }

  @Get('top-interests')
  getTopInterests() {
    return this.employeeService.findTopInterests();
  }
}
