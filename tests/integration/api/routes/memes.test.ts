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

    it('should respond with 400 if no `title` is provided in the payload', async () => {
      expect.assertions(3);

      await Meme.deleteMany({});

      const badData = { ...inputData };
      delete badData.title;

      const res = await request(app)
        .post('/api/memes')
        .send(badData);

      expect(res.status).toBe(400);
      expect(res.body.message).toContain('title');
      const docsLen = await Meme.countDocuments({});
      expect(docsLen).toBe(0);
    });

    it('should respond with 400 if no `description` is provided in the payload', async () => {
      expect.assertions(3);

      await Meme.deleteMany({});

      const badData = { ...inputData };
      delete badData.description;

      const res = await request(app)
        .post('/api/memes')
        .send(badData);

      expect(res.status).toBe(400);
      expect(res.body.message).toContain('description');
      const docsLen = await Meme.countDocuments({});
      expect(docsLen).toBe(0);
    });
  });

  describe('PUT /api/memes/:id', () => {
    it('should update the meme fields provided in the payload', async () => {
      expect.assertions(5);
      const existing = await Meme.findOne({});

      if (!existing) throw new Error('No seed test data!');

      const updatedFields = {
        title: 'Updated title',
        keyPhrases: ['one', 'two'],
        description: 'Updated description',
      };

      const res = await request(app)
        .put(`/api/memes/${existing.id}`)
        .send(updatedFields);

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({ _id: existing.id, ...updatedFields });

      const updatedMeme = await Meme.findById(existing._id);

      if (!updatedMeme)
        throw new Error('No updated meme object found in the db!');

      expect(updatedMeme.title).toBe(updatedFields.title);
      expect(updatedMeme.keyPhrases).toEqual(
        expect.arrayContaining(updatedFields.keyPhrases)
      );
      expect(updatedMeme.description).toBe(updatedFields.description);
    });
  });

  describe('DELETE /api/memes/:id', () => {
    it('should delete a single meme item', async () => {
      expect.assertions(3);
      const existing = await Meme.findOne({});

      if (!existing) throw new Error('No seed test data!');
      const res = await request(app).delete(`/api/memes/${existing.id}`);

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({ _id: existing.id });

      const updatedMeme = await Meme.findById(existing._id);
      expect(updatedMeme).toBeFalsy();
    });
  });
  // TODO: test Search

  describe('GET /api/memes/search', () => {
    it('should respond with 400 if no query param is passed in the URL', async () => {
      expect.assertions(2);
      const res = await request(app).get('/api/memes/search');

      expect(res.status).toBe(400);
      expect(res.body.message).toContain('query');
    });

    it('should respond with 400 if query param is empty', async () => {
      expect.assertions(2);
      const res = await request(app).get('/api/memes/search?query=');

      expect(res.status).toBe(400);
      expect(res.body.message).toContain('query');
    });

    it('should respond with 400 if query param is less than 3 chars long', async () => {
      expect.assertions(2);
      const res = await request(app).get('/api/memes/search?query=ab');

      expect(res.status).toBe(400);
      expect(res.body.message).toContain('query');
    });

    it('should respond with a paginated list of memes for a valid query param', async () => {
      expect.assertions(6);
      const res = await request(app).get('/api/memes/search?query=abc');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('data');
      expect(res.body).toHaveProperty('meta');
      expect(res.body.meta).toHaveProperty('total');
      expect(res.body.meta).toHaveProperty('page');
      expect(res.body.meta).toHaveProperty('size');
    });

    it(`should respond with a correct pagination info if the user chooses to 
      override the defaults`, async () => {
      expect.assertions(6);
      const res = await request(app).get(
        '/api/memes/search?query=abc&size=10&page=2'
      );

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('data');
      expect(res.body).toHaveProperty('meta');
      expect(res.body.meta).toHaveProperty('total');
      expect(res.body.meta).toHaveProperty('page', 2);
      expect(res.body.meta).toHaveProperty('size', 10);
    });

    it(`should search in the meme's Title field`, async () => {
      expect.assertions(3);
      const res = await request(app).get(
        '/api/memes/search?query=raid is still'
      );

      expect(res.status).toBe(200);
      expect(res.body.data.length > 0).toBe(true);
      expect(res.body.data[0].title).toBe(
        'The Area 51 raid is still happening right?'
      );
    });

    it(`should search in the meme's Description field`, async () => {
      expect.assertions(3);
      const res = await request(app).get('/api/memes/search?query=4 wheels');

      expect(res.status).toBe(200);
      expect(res.body.data.length > 0).toBe(true);
      expect(res.body.data[0].description).toBe(
        'Me leaving area 51 with a shopping trolley that has 4 wheels'
      );
    });

    it(`should search in the meme's keyPhrases field`, async () => {
      expect.assertions(4);
      const res = await request(app).get(
        '/api/memes/search?query=shopping cart'
      );

      expect(res.status).toBe(200);
      expect(res.body.data.length > 0).toBe(true);
      expect(res.body.data[0].keyPhrases).toContain('shopping');
      expect(res.body.data[0].keyPhrases).toContain('cart');
    });

    it('should ignore the case when searching', async () => {
      expect.assertions(3);
      const res = await request(app).get('/api/memes/search?query=rAID StIll');

      expect(res.status).toBe(200);
      expect(res.body.data.length > 0).toBe(true);
      expect(res.body.data[0].title).toBe(
        'The Area 51 raid is still happening right?'
      );
    });

    it('should search accross multiple fields', async () => {
      expect.assertions(3);
      // fact => title; banner => keyphrase; better => description
      const res = await request(app).get(
        '/api/memes/search?query=fact better banner'
      );

      expect(res.status).toBe(200);
      expect(res.body.data.length > 0).toBe(true);
      expect(res.body.data[0].title).toBe("And that's a fact");
    });

    it(`should properly sort the memes based on the match score`, async () => {
      expect.assertions(4);

      // Note: 2 entries contain the `running` keyphrase
      const res = await request(app).get(
        '/api/memes/search?query=police running'
      );

      expect(res.status).toBe(200);
      expect(res.body.data.length > 0).toBe(true);
      expect(res.body.data[0].title).toBe(
        'The Area 51 raid is still happening right?'
      );
      expect(res.body.data[1].title).toBe("And that's a fact");
    });
  });
});
