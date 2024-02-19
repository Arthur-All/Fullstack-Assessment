## Usage:

### Development

To start the development environment, run:
```bash
npm run dev 
``` 
This command will bring up necessary services using Docker Compose and start the Next.js development server.
---
 Services Management
---
- Start services:
```bash
npm run services:up
```
- Stop services:
```bash
npm run services:stop
```
- Remove services:
```bash
npm run services:down
```
---
 Linting
---
To check and fix linting issues, you can use the following commands:

- Check linting:
```bash
npm run lint:check
```
- Fix linting issues:
```bash
npm run lint:fix
```
---
 Testing
---
To run tests, execute:
```bash
npm test
```
For watching mode during development, you can use:
```bash
npm run test:watch
```
---
 Database Migrations
---
For managing database migrations, the following commands are available:
- Create migration:
```bash
npm run migrate:create
```

- Apply migrations:
```bash
npm run migrate:up
```

- Rollback migrations:
```bash
npm run migrate:down
```
---
Postman Examples
---
For examples and documentation of API endpoints, please refer to the Postman collection available [HERE](https://lively-space-371115.postman.co/workspace/Team-Workspace~96962dfa-628d-4028-8451-844ba9857360/collection/15947520-afc1d0e9-7cb8-4547-b9d8-90c32626103c?action=share&creator=15947520) 

---
Diagrama:
---
![Diagram drawio](https://github.com/Arthur-All/Fullstack-Assessment/assets/82613934/67c1a11f-5a3d-433f-8ebc-db33cb4ac6b3)
