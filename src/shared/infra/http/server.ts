import { createConnection } from '@shared/infra/typeorm/data-source';

import { app } from './app';

createConnection()
  .then(() => console.log('Connection with database has been initialized'))
  .catch(error => console.log('Error during database initialization', error));

app.listen(3333, () => console.log('Server is running at port 3333'));
