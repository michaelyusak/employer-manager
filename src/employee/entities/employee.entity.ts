export class Employee {
  FirstName: string;
  LastName: string;
  Designation: string;
  Salary: string;
  DateOfJoining: string;
  Address: string;
  Gender: string;
  Age: number;
  MaritalStatus: string;
  Interests: string;
}

export class EmployeeResponse {
  took: number;
  timed_out: boolean;
  _shards: {
    total: number;
    successful: number;
    skipped: number;
    failed: number;
  };
  hits: {
    total: number;
    max_score: number;
    hits: {
      _index: string;
      _type: string;
      _id: string;
      _score: number;
      _source: Employee;
    }[];
  };
}
