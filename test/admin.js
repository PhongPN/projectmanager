process.env.NODE_ENV = 'test';

import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app.js';
import User from '../model/user.js';

let should = chai.should();

chai.use(chaiHttp);

describe('Admin', () => {
  // let userId;
  // let token;
  // let resettoken;

  it('it should register user', (done) => {
    chai.request(app)
      .post('/users')
      .send({ userName: 'PhongPN', userPass: '123456', userFullName: 'Pham Ngoc Phong' })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.user.should.have.property('_id');
        userId = res.body.user._id;
        done();
      });
  });

  it('it should login', (done) => {
    chai.request(app)
      .post('/users/login')
      .send({ userName: 'PhongPN', userPass: '123456' })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('token');
        token = res.body.token;
        done();
      });
  });

});
