// supertest is a framework that allows to easily test web apis
const request = require('supertest');
// Import sum functions to be tested
const { sum, asyncSum } = require('./sum');
// Import express application
const app = require('../src/index');

//Test asynchronously
describe('Asyncronous test', () => {
  it('adds 2 + 3 to equal 5', () => {
    return asyncSum(2, 3).then((data) => {
      expect(data).toBe(5);
    });
  });
});

//Test synchronously
describe('Synchronous test', () => {
  it('adds 0 + 2 to equal 2', () => {
    expect(sum(0, 2)).toBe(2);
  });

  it('adds 1 + 0 to equal 1', () => {
    expect(sum(1, 0)).toBe(1);
  });
});

//Test endpoints with super test
describe('testing-server-routes', () => {
  it('GET / - success', async () => {
    const data = await request(app).get('/'); //uses the request function that calls on express app instance
    expect(data.status).toBe(200);
  });

  it('GET /states - success', async () => {
    const data = await request(app).get('/player'); //uses the request function that calls on express app instance
    expect(data.body.data[0].name).toMatch(/Tiwatope/);
  });
});
