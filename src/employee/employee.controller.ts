import { Controller, Get } from '@nestjs/common';
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
}
