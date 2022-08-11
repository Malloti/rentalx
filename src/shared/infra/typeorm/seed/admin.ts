import { hash } from 'bcryptjs';
import { v4 as uuidV4 } from 'uuid';

import AppDataSource from '../data-source';

async function create() {
  const connection = await AppDataSource.initialize();

  const id = uuidV4();
  const password = await hash('admin', 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, is_admin, driver_license)
     VALUES('${id}', 'admin', 'admin@rentalx.com.br', '${password}', true, 'abcdefg')
    `,
  );

  await connection.destroy();
}

create()
  .then(() => console.log('User admin created!'))
  .catch(e => console.log('Error creating user admin', e));
