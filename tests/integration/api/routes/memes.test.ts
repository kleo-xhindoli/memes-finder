import request from 'supertest';
import { testData, generateMemes, inputData } from './test-data/memes';
import app, { server, connection } from '../../../../src';
import Meme from '../../../../src/models/Meme.model';

const DEFAULT_PAGE_SIZE = 50;

describe('Integration | Memes API', () => {
  beforeEach(async () => {
    await Meme.deleteMany({});
    await Meme.create(testData);
  });

  afterAll(async () => {
    await server.close();
    await connection.close();
  });

  describe('GET /api/memes', () => {
    it('should respond with the list of memes and pagination info', async () => {
      expect.assertions(3);

      const res = await request(app).get('/api/memes');

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(testData.length);
      expect(res.body.meta).toEqual({
        page: 0,
        size: DEFAULT_PAGE_SIZE,
        total: testData.length,
      });
    });

    it(`should respond with at most ${DEFAULT_PAGE_SIZE} items in data by default`, async () => {
      expect.assertions(3);

      await Meme.create(generateMemes(DEFAULT_PAGE_SIZE));
      const totalCount = testData.length + DEFAULT_PAGE_SIZE;

      const res = await request(app).get('/api/memes');

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(DEFAULT_PAGE_SIZE);
      expect(res.body.meta).toEqual({
        page: 0,
        size: DEFAULT_PAGE_SIZE,
        total: totalCount,
      });
    });

    it('should respond with at most [size] items in data', async () => {
      expect.assertions(3);

      await Meme.create(generateMemes(DEFAULT_PAGE_SIZE));
      const totalCount = testData.length + DEFAULT_PAGE_SIZE;

      const res = await request(app).get('/api/memes?size=20');

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(20);
      expect(res.body.meta).toEqual({
        page: 0,
        size: 20,
        total: totalCount,
      });
    });

    it('should respond with the remaining items in the second page', async () => {
      expect.assertions(3);

      await Meme.create(generateMemes(DEFAULT_PAGE_SIZE));
      const totalCount = testData.length + DEFAULT_PAGE_SIZE;

      const res = await request(app).get('/api/memes?page=1');

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(totalCount - DEFAULT_PAGE_SIZE);
      expect(res.body.meta).toEqual({
        page: 1,
        size: DEFAULT_PAGE_SIZE,
        total: totalCount,
      });
    });

    // TODO: add faker to generate fake data in order to test sorting
  });

  describe('POST /api/memes', () => {
    it('should create a new Meme entry with valid input data', async () => {
      expect.assertions(3);

      const res = await request(app)
        .post('/api/memes')
        .send(inputData);

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject(inputData);

      const dbObj = await Meme.findById(res.body._id);
      expect(dbObj).not.toBeNull();
    });
  });
});
