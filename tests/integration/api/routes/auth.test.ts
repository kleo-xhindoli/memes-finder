import request from 'supertest';
import app, { server, connection } from '../../../../src';
import User from '../../../../src/models/User.model';

describe('Integration | Authentication API', () => {
  const dbUser = {
    email: 'test@email.com',
    firstName: 'Test',
    lastName: 'User01',
    password: '$2b$10$nO7xtz1znYRJW6SRsQYIBuas/tPNMQ134eQOYvCrw0ItVWl9lMpcO', // pass1234.
  };

  const newUser = {
    email: 'jari@gmail.com',
    firstName: 'Jari',
    lastName: 'Minatori',
    password: 'GangstaLife98',
  };

  beforeEach(async () => {
    await User.deleteMany({});
    await User.create(dbUser);
  });

  afterAll(async () => {
    await server.close();
    await connection.close();
  });

  describe('/api/auth/register', () => {
    it('should allow registration with valid data', async () => {
      expect.assertions(6);

      const res = await request(app)
        .post('/api/auth/register')
        .send({
          ...newUser,
        });

      expect(res.status).toBe(200);
      expect(res.body.user.firstName).toBe(newUser.firstName);
      expect(res.body.user.lastName).toBe(newUser.lastName);
      expect(res.body.user.email).toBe(newUser.email);
      expect(res.body.user.password).toBeUndefined();
      expect(res.body.authToken).toBeDefined();
    });

    // Email
    it('should return a 400 error when email is missing', async () => {
      expect.assertions(2);

      const badUser = { ...newUser };
      delete badUser.email;

      const res = await request(app)
        .post('/api/auth/register')
        .send({
          ...badUser,
        });

      expect(res.status).toBe(400);
      expect(res.body.message.toLowerCase()).toContain('email');
    });

    it('should return a 400 error when email is not valid', async () => {
      expect.assertions(2);

      const badUser = { ...newUser };
      badUser.email = 'notvalid@';

      const res = await request(app)
        .post('/api/auth/register')
        .send({
          ...badUser,
        });

      expect(res.status).toBe(400);
      expect(res.body.message.toLowerCase()).toContain('email');
    });

    it('should return a 400 error when email already exists', async () => {
      expect.assertions(2);

      const badUser = { ...newUser };
      badUser.email = dbUser.email;

      const res = await request(app)
        .post('/api/auth/register')
        .send({
          ...badUser,
        });

      expect(res.status).toBe(400);
      expect(res.body.message.toLowerCase()).toContain('email');
    });

    // Password
    it('should return a 400 error when password is missing', async () => {
      expect.assertions(2);

      const badUser = { ...newUser };
      delete badUser.password;

      const res = await request(app)
        .post('/api/auth/register')
        .send({
          ...badUser,
        });

      expect(res.status).toBe(400);
      expect(res.body.message.toLowerCase()).toContain('password');
    });

    it('should return a 400 error when password is shorter than 6 characters', async () => {
      expect.assertions(2);

      const badUser = { ...newUser };
      badUser.password = '12345';

      const res = await request(app)
        .post('/api/auth/register')
        .send({
          ...badUser,
        });

      expect(res.status).toBe(400);
      expect(res.body.message.toLowerCase()).toContain('password');
    });

    // First Name
    it('should return a 400 error when firstName is missing', async () => {
      expect.assertions(2);

      const badUser = { ...newUser };
      delete badUser.firstName;

      const res = await request(app)
        .post('/api/auth/register')
        .send({
          ...badUser,
        });

      expect(res.status).toBe(400);
      expect(res.body.message.toLowerCase()).toContain('firstname');
    });

    // Last Name
    it('should return a 400 error when lastName is missing', async () => {
      expect.assertions(2);

      const badUser = { ...newUser };
      delete badUser.lastName;

      const res = await request(app)
        .post('/api/auth/register')
        .send({
          ...badUser,
        });

      expect(res.status).toBe(400);
      expect(res.body.message.toLowerCase()).toContain('lastname');
    });

    // Misc bad input
    it('should return a 400 error when input isnt valid json', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send('{"blah:');

      expect(res.status).toBe(400);
    });

    it('should return a 400 error when input is empty', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({});

      expect(res.status).toBe(400);
    });

    it('should return a 400 error when unexpected properties are sent', async () => {
      expect.assertions(2);
      const res = await request(app)
        .post('/api/auth/register')
        .send({ ...newUser, test: 'field' });

      expect(res.status).toBe(400);
      expect(res.body.message.toLowerCase()).toContain('test');
    });
  });

  // Login
  describe('/api/auth/login', () => {
    it('should respond with the user when credentials are valid', async () => {
      expect.assertions(6);

      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: dbUser.email,
          password: 'pass1234.',
        });

      expect(res.status).toBe(200);
      expect(res.body.user.firstName).toBe(dbUser.firstName);
      expect(res.body.user.lastName).toBe(dbUser.lastName);
      expect(res.body.user.email).toBe(dbUser.email);
      expect(res.body.user.password).toBeUndefined();
      expect(res.body.authToken).toBeDefined();
    });

    it('should respond with 400 if the given email dosnt exist', async () => {
      expect.assertions(2);

      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test2@email.com',
          password: 'pass1234.',
        });

      expect(res.status).toBe(400);
      expect(res.body.message.toLowerCase()).toContain('email');
    });

    it('should respond with 400 if the given password is incorrect', async () => {
      expect.assertions(3);

      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: dbUser.email,
          password: 'pass12345.',
        });

      expect(res.status).toBe(400);
      expect(res.body.message.toLowerCase()).toContain('email');
      expect(res.body.message.toLowerCase()).toContain('password');
    });

    it('should respond with 400 if the given email isnt valid', async () => {
      expect.assertions(2);

      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'dbUser.email',
          password: 'pass1234.',
        });

      expect(res.status).toBe(400);
      expect(res.body.message.toLowerCase()).toContain('email');
    });

    it('should respond with 400 if the email is missing', async () => {
      expect.assertions(2);

      const res = await request(app)
        .post('/api/auth/login')
        .send({
          password: 'pass1234.',
        });

      expect(res.status).toBe(400);
      expect(res.body.message.toLowerCase()).toContain('email');
    });

    it('should respond with 400 if the password is missing', async () => {
      expect.assertions(2);

      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: dbUser.email,
        });

      expect(res.status).toBe(400);
      expect(res.body.message.toLowerCase()).toContain('password');
    });
  });
});
