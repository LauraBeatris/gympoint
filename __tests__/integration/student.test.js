import request from 'supertest';

import app from '../../src/app';
import factory from '../factory';
import truncate from '../util/truncate';

describe('Student', () => {
  beforeEach(async () => {
    // Deleting all of the old the registers before run each test
    await truncate();
  });

  it('should succesfully create a student', async () => {
    // Generating the user data
    const user = await factory.attrs('User');

    // Creating the user
    await request(app)
      .post('/users')
      .send(user);

    const { email, password } = user;

    // Creating an session
    const { body: sessionBody } = await request(app)
      .post('/sessions')
      .send({ email, password });

    const studentData = await factory.attrs('Student');

    // Creating the student passing the auth header
    const { body: student } = await request(app)
      .post('/students')
      .send(studentData)
      .set('Authorization', `Bearer ${sessionBody.token}`);

    expect(student).toHaveProperty('id');
  });

  it('should succesfully update a student', async () => {
    // Generating the user data
    const user = await factory.attrs('User');

    // Creating the user
    await request(app)
      .post('/users')
      .send(user);

    const { email, password } = user;

    // Creating an session
    const { body: sessionBody } = await request(app)
      .post('/sessions')
      .send({ email, password });

    const studentData = await factory.attrs('Student');

    // Creating the student passing the auth header
    const { body: student } = await request(app)
      .post('/students')
      .send(studentData)
      .set('Authorization', `Bearer ${sessionBody.token}`);

    const { id } = student;
    // Updating the student data
    const { body: updatedStudent } = await request(app)
      .put(`/students/${id}`)
      .send({ ...studentData, name: 'New name' })
      .set('Authorization', `Bearer ${sessionBody.token}`);

    expect(updatedStudent.name).toBe('New name');
  });

  it("shouldn't create a student with an email that already exists", async () => {});

  it("shouldn't update a student with an email that already exists", async () => {});

  it('should pass the student id', async () => {});
});
