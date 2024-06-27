import { Injectable } from '@nestjs/common';
import { getFromElastic } from 'src/hooks/elsticsearch';

@Injectable()
export class EmployeeService {
  async count() {
    const responseData = await getFromElastic(
      'http://localhost:9200/companydatabase/_count',
    );

    return { count: responseData.count };
  }
}
