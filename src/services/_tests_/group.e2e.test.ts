import request from 'supertest';

import app from '../..';
import { DataSource } from 'typeorm';

describe('Group APIs', () => {
    var testGroupId: number;
    var testUserId: number;
    var adminToken: string;
  var username=`user-${Math.floor(Math.random()*(999-100+1)+100)}`;
  var password= `user@123`

  beforeAll(async () => {
    const AppDataSource = new DataSource({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      synchronize: true,
      logging: true,
      entities: [process.cwd() + '/src/entities/*.ts'], 
    })
    AppDataSource.initialize();
  });

  it('should create an admin user', async () => {
    const response = await request(app)
      .post('/auth/signup')
      .send({ username: username, password: password, isAdmin: true })
      .expect(200);
    expect(response.body).toHaveProperty('data.id');
    testUserId = response.body.data.id;
  });

  it('should authenticate admin user and get token', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ username: username, password: password })
      .expect(200);

    expect(response.body).toHaveProperty('token');
    adminToken = response.body.token;
  });

  it('should create a group', async () => {
    const response = await request(app)
      .post('/group/create')
      .set('Authorization', `${adminToken}`)
      .send({ name: 'Test Group' })
      .expect(200);

    expect(response.body).toHaveProperty('message', 'Group created successfully');
    expect(response.body).toHaveProperty('data.id');
    testGroupId = response.body.data.id;
  });

  it('should edit a group', async () => {
    const response = await request(app)
      .post('/group/edit')
      .set('Authorization', `${adminToken}`)
      .send({ groupId: testGroupId, name: 'Updated Test Group' })
      // .expect(200);
console.log(response)
    expect(response.body).toHaveProperty('message', 'Group edited successfully');
  });

  it('should add a user to the group', async () => {
    const response = await request(app)
      .post('/group/addUser')
      .set('Authorization', `${adminToken}`)
      .send({ userId: testUserId, groupId: testGroupId })
      .expect(200);
  

    expect(response.body).toHaveProperty('message', 'User added to group successfully');
  });

  it('should remove a user from the group', async () => {
    const response = await request(app)
      .post('/group/removeUser')
      .set('Authorization', `${adminToken}`)
      .send({ userId: testUserId, groupId: testGroupId })
      .expect(200);

    expect(response.body).toHaveProperty('message', 'User removed from group successfully');
  });

  it('should remove a group', async () => {
    const response = await request(app)
      .delete('/group/remove/'+testGroupId)
      .set('Authorization', `${adminToken}`)
      .send({ groupId: testGroupId })
      .expect(200);

    expect(response.body).toHaveProperty('message', 'Group removed successfully');
  });
});