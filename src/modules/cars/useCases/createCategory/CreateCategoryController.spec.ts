import { hash } from 'bcryptjs';
import request from 'supertest';
import { DataSource } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import { createConnection } from '@shared/infra/typeorm/data-source';

let connection: DataSource;

describe('Create Category Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash('admin', 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, is_admin, driver_license)
       VALUES('${id}', 'admin', 'admin@rentalx.com.br', '${password}', true, 'abcdefg')
      `,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.destroy();
  });

  it('Should be able to create a new category', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentalx.com.br',
      password: 'admin',
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Category supertest',
        description: 'Category supertest',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(201);
  });

  it('Should be able to create a new category with name exists', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentalx.com.br',
      password: 'admin',
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Category supertest',
        description: 'Category supertest',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(400);
  });
});
