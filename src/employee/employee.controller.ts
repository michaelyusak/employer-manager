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
  async getAverage() {
    const totalEmployee = await this.employeeService.count();

    return this.employeeService.findAverageSalary(totalEmployee.count);
  }
}
