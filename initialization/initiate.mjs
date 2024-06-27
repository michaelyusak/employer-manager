import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const host = process.env.HOST;

async function splitInterestsPipeline() {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      version: 1,
      processors: [
        {
          split: {
            field: 'Interests',
            target_field: 'ProcessedInterests',
            separator: ',',
          },
        },
      ],
    }),
  };

  const url = host + '/_ingest/pipeline/companydatabase';

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error('failed to create pipeline');
  }
}

async function createMapping() {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      mappings: {
        employees: {
          properties: {
            FirstName: { type: 'text' },
            LastName: { type: 'text' },
            Designation: { type: 'keyword' },
            Salary: { type: 'integer' },
            DateOfJoining: { type: 'date', format: 'yyyy-MM-dd' },
            Address: { type: 'text' },
            Gender: { type: 'text' },
            Age: { type: 'integer' },
            MaritalStatus: { type: 'text' },
            Interests: { type: 'text' },
            ProcessedInterests: { type: 'keyword' },
          },
        },
      },
    }),
  };

  const url = host + '/companydatabase/';

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error('failed to create mapping');
  }
}

async function turnOnFieldData() {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      properties: {
        Gender: {
          type: 'text',
          fielddata: true,
        },
        MaritalStatus: {
          type: 'text',
          fielddata: true,
        },
      },
    }),
  };

  const url = host + '/companydatabase/_doc/_mapping';

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error('failed to turn on field data');
  }
}

async function bulkInsert() {
  const data = fs.readFileSync('./initialization/data/Employees50K.json');

  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: data,
  };

  const url = host + '/companydatabase/_bulk?pipeline=companydatabase';

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error('failed to insert employees data');
  }
}

splitInterestsPipeline()
  .then(() => createMapping())
  .then(() => turnOnFieldData())
  .then(() => bulkInsert())
  .then(() => {
    console.log('project initialization complete');
  });
