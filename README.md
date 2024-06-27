# Employees Manager
This task is done using `Node.js`, `Nest.js`, and `elasticsearch`

## How to Run?
1. Create `.env` file. `.env.example` is provided.
2. Make sure currently there is no database named `companydatabase` in your elasticsearch.
3. Run `node initialization/initiate.mjs`.
4. If you encounter no error, proceed to run `npm run start:dev`
5. Add this collection to your postman to see the request examples. [copy this link](https://api.postman.com/collections/33040861-093fefe0-54bd-4851-b165-c1a0a66cddce?access_key=PMAT-01J1DH9ZT8EQZN9V92JXTRWT3P)

## Note
* Field type of `Designation` is changed from `text` to `keyword` to avoid `elasticsearch` separate each word of the value.
* `fielddata` for `Gender` and `MaritalStatus` are turned on to allow terms aggregation for those fields.
* `ProcessedInterests` is added to store the individual interest from `Interests`, making it possible for terms aggregation.