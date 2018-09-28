const app = require('./koaserver');
const server = app.listen();
const request = require('supertest').agent(server);

describe('case test', function() {
  after(function() {
    server.close();
  });

  it('/hello should say "你好"', function(done) {
    request
    .get('/hello')
    .expect(200)
    .expect('你好', done)
  });
  it('/name should say "馮志揚"', function(done) {
    request
    .get('/name')
    .expect(200)
    .expect('馮志揚', done)
  });
  it('/id should say "110510524"', function(done) {
    request
    .get('/id')
    .expect(200)
    .expect('110510524', done)
  });
  it('/xxx/yyy should status = 404', function(done) {
    request
    .get('/xxx/yyy')
    .expect(404, done)
  });
});