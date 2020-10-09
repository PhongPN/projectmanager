process.env.NODE_ENV = 'test';

import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { checkStatus } from '../helper/checkInput.js';

import app from '../app.js';

let should = chai.should();

chai.use(chaiHttp);

describe('TEST', () => {
  it('TEST', (done) => {
    const res = checkStatus('active');
    done()
  })
})

describe('Unit Test', () => {
  let token;
  let projectStatusId;
  let projectKindId;
  let teckStackId;
  let projectId;
  let departmentId;
  let employeeId;
  describe('Login', () => {
    it('it should login', (done) => {
      chai.request(app)
        .post('/login')
        .send({ username: 'admin', password: '123456' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('data');
          token = res.body.data;
          done();
        });
    });

    it('it should respone code: 400, messagecode: MISSING_INPUT', (done) => {
      chai.request(app)
        .post('/login')
        .send({ username: '', password: '123456' })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.have.property('code').eql('MISSING_INPUT');
          done();
        });
    });

    it('it should respone code: 400, messagecode: MISSING_INPUT', (done) => {
      chai.request(app)
        .post('/login')
        .send({ username: 'admin', password: '' })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.have.property('code').eql('MISSING_INPUT');
          done();
        });
    });

    it('it should respone code: 400, messagecode: USERNAME_NOTFOUND', (done) => {
      chai.request(app)
        .post('/login')
        .send({ username: 'admin1', password: '123456' })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.have.property('code').eql('USERNAME_NOTFOUND');
          done();
        });
    });

    it('it should respone code: 400, messagecode: LOGIN_FAILED', (done) => {
      chai.request(app)
        .post('/login')
        .send({ username: 'admin', password: '1234567' })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.have.property('code').eql('LOGIN_FAILED');
          done();
        });
    });

  });

  describe('Project Status', () => {
    //Create project status
    describe('Create Project Status', () => {

      it('it should create project status', (done) => {
        chai.request(app)
          .post('/projectstatuses')
          .set('authorization', 'Bearer: ' + token)
          .send({ projectStatusName: 'End', projectStatusDesciption: 'Ket thuc', projectStatusStatus: 'active' })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.message.should.have.property('code').eql('CREATE_PROJECT_STATUS_SUCCESS');
            projectStatusId = res.body.data._id;
            done();
          });
      });

      it('it should respone code: 400, messagecode: PROJECT_STATUS_INPUT_INVALID', (done) => {
        chai.request(app)
          .post('/projectstatuses')
          .set('authorization', 'Bearer: ' + token)
          .send({ projectStatusName: '', projectStatusDesciption: 'Ket thuc', projectStatusStatus: 'active' })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.message.should.have.property('code').eql('PROJECT_STATUS_INPUT_INVALID');
            done();
          });
      });

      it('it should respone code: 400, messagecode: PROJECT_STATUS_INPUT_INVALID', (done) => {
        chai.request(app)
          .post('/projectstatuses')
          .set('authorization', 'Bearer: ' + token)
          .send({ projectStatusName: '', projectStatusDesciption: 'Ket thuc', projectStatusStatus: 'acive' })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.message.should.have.property('code').eql('PROJECT_STATUS_INPUT_INVALID');
            done();
          });
      });

      it('it should respone code: 400, messagecode: PROJECT_STATUS_EXIST', (done) => {
        chai.request(app)
          .post('/projectstatuses')
          .set('authorization', 'Bearer: ' + token)
          .send({ projectStatusName: 'End', projectStatusDesciption: 'Ket thuc', projectStatusStatus: 'active' })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.message.should.have.property('code').eql('PROJECT_STATUS_EXIST');
            done();
          });
      });
    });

    //Find project status by name
    describe('Find Project Status By Name', () => {

      it('it should get project status', (done) => {
        chai.request(app)
          .get('/projectstatuses')
          .set('authorization', 'Bearer: ' + token)
          .send({ projectStatusName: 'start' })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.message.should.have.property('code').eql('FIND_PROJECT_STATUS_SUCCESS');
            done();
          });
      });

      it('it should respone code: 400, messagecode: PROJECT_STATUS_INPUT_INVALID', (done) => {
        chai.request(app)
          .get('/projectstatuses')
          .set('authorization', 'Bearer: ' + token)
          .send({ projectStatusName: '' })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.message.should.have.property('code').eql('PROJECT_STATUS_INPUT_INVALID');
            done();
          });
      });

      it('it should respone code: 400, messagecode: FIND_PROJECT_STATUS_FAILED', (done) => {
        chai.request(app)
          .get('/projectstatuses')
          .set('authorization', 'Bearer: ' + token)
          .send({ projectStatusName: 'abc' })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.message.should.have.property('code').eql('FIND_PROJECT_STATUS_FAILED');
            done();
          });
      });
    });

    //Find project status
    describe('Find Project Status', () => {

      it('it should get project status', (done) => {
        chai.request(app)
          .get('/projectstatuses/' + projectStatusId)
          .set('authorization', 'Bearer: ' + token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.message.should.have.property('code').eql('FIND_PROJECT_STATUS_SUCCESS');
            done();
          });
      });

      it('it should respone code: 500, messagecode: SERVER_ERROR', (done) => {
        chai.request(app)
          .get('/projectstatuses/' + 'projectStatusId')
          .set('authorization', 'Bearer: ' + token)
          .end((err, res) => {
            res.should.have.status(500);
            res.body.message.should.have.property('code').eql('SERVER_ERROR');
            done();
          });
      });

      it('it should respone code: 400, messagecode: FIND_PROJECT_STATUS_FAILED', (done) => {
        chai.request(app)
          .get('/projectstatuses/' + '5f7d387cbc93490244e6e5c5')
          .set('authorization', 'Bearer: ' + token)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.message.should.have.property('code').eql('FIND_PROJECT_STATUS_FAILED');
            done();
          });
      });
    });

    //Update project status
    describe('Update Project Status', () => {

      it('it should update project status', (done) => {
        chai.request(app)
          .put('/projectstatuses/' + projectStatusId)
          .set('authorization', 'Bearer: ' + token)
          .send({ projectStatusName: 'Abc', projectStatusDesciption: 'Ket thuc', projectStatusStatus: 'active' })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.message.should.have.property('code').eql('UPDATE_PROJECT_STATUS_SUCCESS');
            done();
          });
      });

      it('it should respone code: 500, messagecode: SERVER_ERROR', (done) => {
        chai.request(app)
          .put('/projectstatuses/' + 'projectStatusId')
          .set('authorization', 'Bearer: ' + token)
          .end((err, res) => {
            res.should.have.status(500);
            res.body.message.should.have.property('code').eql('SERVER_ERROR');
            done();
          });
      });
    });

    //Delete project status
    describe('Delete Project Status', () => {

      it('it should delete project status', (done) => {
        chai.request(app)
          .delete('/projectstatuses/' + projectStatusId)
          .set('authorization', 'Bearer: ' + token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.message.should.have.property('code').eql('DELETE_PROJECT_STATUS_SUCCESS');
            done();
          });
      });

      it('it should respone code: 400, messagecode: DELETE_PROJECT_STATUS_FAILED', (done) => {
        chai.request(app)
          .delete('/projectstatuses/' + '5f7d387cbc93490244e6e5c5')
          .set('authorization', 'Bearer: ' + token)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.message.should.have.property('code').eql('DELETE_PROJECT_STATUS_FAILED');
            done();
          });
      });

      it('it should respone code: 500, messagecode: SERVER_ERROR', (done) => {
        chai.request(app)
          .delete('/projectstatuses/' + 'projectStatusId')
          .set('authorization', 'Bearer: ' + token)
          .end((err, res) => {
            res.should.have.status(500);
            res.body.message.should.have.property('code').eql('SERVER_ERROR');
            done();
          });
      });
    });

  });

  describe('Project Kind', () => {
    //Create project kind
    describe('Create Project Kind', () => {

      it('it should create project kind', (done) => {
        chai.request(app)
          .post('/projectkinds')
          .set('authorization', 'Bearer: ' + token)
          .send({ projectKindName: 'Product', projectKindKeyNumber: '1', projectKindStatus: 'active' })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.message.should.have.property('code').eql('CREATE_PROJECT_KIND_SUCCESS');
            projectKindId = res.body.data._id;
            done();
          });
      });

      it('it should respone code: 400, messagecode: PROJECT_KIND_INPUT_INVALID', (done) => {
        chai.request(app)
          .post('/projectkinds')
          .set('authorization', 'Bearer: ' + token)
          .send({ projectKindName: '', projectKindKeyNumber: '2', projectKindStatus: 'active' })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.message.should.have.property('code').eql('PROJECT_KIND_INPUT_INVALID');
            done();
          });
      });

      it('it should respone code: 400, messagecode: PROJECT_KIND_INPUT_INVALID', (done) => {
        chai.request(app)
          .post('/projectkinds')
          .set('authorization', 'Bearer: ' + token)
          .send({ projectKindName: 'abc', projectKindKeyNumber: '2', projectKindStatus: 'acive' })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.message.should.have.property('code').eql('PROJECT_KIND_INPUT_INVALID');
            done();
          });
      });

      it('it should respone code: 400, messagecode: PROJECT_KIND_EXIST', (done) => {
        chai.request(app)
          .post('/projectkinds')
          .set('authorization', 'Bearer: ' + token)
          .send({ projectKindName: 'Product', projectKindKeyNumber: '2', projectKindStatus: 'active' })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.message.should.have.property('code').eql('PROJECT_KIND_EXIST');
            done();
          });
      });
    });

    //Find project kind by name
    describe('Find Project Kind By Name', () => {

      it('it should get project kind', (done) => {
        chai.request(app)
          .get('/projectkinds')
          .set('authorization', 'Bearer: ' + token)
          .send({ projectKindName: 'Product' })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.message.should.have.property('code').eql('FIND_PROJECT_KIND_SUCCESS');
            done();
          });
      });

      it('it should respone code: 400, messagecode: PROJECT_KIND_INPUT_INVALID', (done) => {
        chai.request(app)
          .get('/projectkinds')
          .set('authorization', 'Bearer: ' + token)
          .send({ projectKindName: '' })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.message.should.have.property('code').eql('PROJECT_KIND_INPUT_INVALID');
            done();
          });
      });

      it('it should respone code: 400, messagecode: FIND_PROJECT_KIND_FAILED', (done) => {
        chai.request(app)
          .get('/projectkinds')
          .set('authorization', 'Bearer: ' + token)
          .send({ projectKindName: 'abc' })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.message.should.have.property('code').eql('FIND_PROJECT_KIND_FAILED');
            done();
          });
      });
    });

    //Find project kind
    describe('Find Project Kind', () => {

      it('it should get project kind', (done) => {
        chai.request(app)
          .get('/projectkinds/' + projectKindId)
          .set('authorization', 'Bearer: ' + token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.message.should.have.property('code').eql('FIND_PROJECT_KIND_SUCCESS');
            done();
          });
      });

      it('it should respone code: 500, messagecode: SERVER_ERROR', (done) => {
        chai.request(app)
          .get('/projectkinds/' + 'projectKindId')
          .set('authorization', 'Bearer: ' + token)
          .end((err, res) => {
            res.should.have.status(500);
            res.body.message.should.have.property('code').eql('SERVER_ERROR');
            done();
          });
      });

      it('it should respone code: 400, messagecode: FIND_PROJECT_KIND_FAILED', (done) => {
        chai.request(app)
          .get('/projectkinds/' + '5f7d387cbc93490244e6e5c5')
          .set('authorization', 'Bearer: ' + token)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.message.should.have.property('code').eql('FIND_PROJECT_KIND_FAILED');
            done();
          });
      });
    });

    //Update project kind
    describe('Update Project Kind', () => {

      it('it should update project kind', (done) => {
        chai.request(app)
          .put('/projectkinds/' + projectKindId)
          .set('authorization', 'Bearer: ' + token)
          .send({ projectKindName: 'abc', projectKindKeyNumber: '2', projectKindStatus: 'active' })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.message.should.have.property('code').eql('UPDATE_PROJECT_KIND_SUCCESS');
            done();
          });
      });

      it('it should respone code: 500, messagecode: SERVER_ERROR', (done) => {
        chai.request(app)
          .put('/projectkinds/' + 'projectKindId')
          .set('authorization', 'Bearer: ' + token)
          .end((err, res) => {
            res.should.have.status(500);
            res.body.message.should.have.property('code').eql('SERVER_ERROR');
            done();
          });
      });
    });

    //Delete project kind
    describe('Delete Project Status', () => {

      it('it should delete project kind', (done) => {
        chai.request(app)
          .delete('/projectkinds/' + projectKindId)
          .set('authorization', 'Bearer: ' + token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.message.should.have.property('code').eql('DELETE_PROJECT_KIND_SUCCESS');
            done();
          });
      });

      it('it should respone code: 400, messagecode: DELETE_PROJECT_KIND_FAILED', (done) => {
        chai.request(app)
          .delete('/projectkinds/' + '5f7d387cbc93490244e6e5c5')
          .set('authorization', 'Bearer: ' + token)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.message.should.have.property('code').eql('DELETE_PROJECT_KIND_FAILED');
            done();
          });
      });

      it('it should respone code: 500, messagecode: SERVER_ERROR', (done) => {
        chai.request(app)
          .delete('/projectkinds/' + 'projectKindId')
          .set('authorization', 'Bearer: ' + token)
          .end((err, res) => {
            res.should.have.status(500);
            res.body.message.should.have.property('code').eql('SERVER_ERROR');
            done();
          });
      });
    });

  });

  describe('Tech Stack', () => {
    //Create tech stack
    describe('Create Tech Stack', () => {

      it('it should create tech stack', (done) => {
        chai.request(app)
          .post('/techstacks')
          .set('authorization', 'Bearer: ' + token)
          .send({ techStackName: 'Java', techStackDesciption: 'java', techStackStatus: 'active' })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.message.should.have.property('code').eql('CREATE_TECH_STACK_SUCCESS');
            teckStackId = res.body.data._id;
            done();
          });
      });

      it('it should respone code: 400, messagecode: TECH_STACK_INPUT_INVALID', (done) => {
        chai.request(app)
          .post('/techstacks')
          .set('authorization', 'Bearer: ' + token)
          .send({ techStackName: '', techStackDesciption: 'java', techStackStatus: 'active' })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.message.should.have.property('code').eql('TECH_STACK_INPUT_INVALID');
            done();
          });
      });

      it('it should respone code: 400, messagecode: TECH_STACK_INPUT_INVALID', (done) => {
        chai.request(app)
          .post('/techstacks')
          .set('authorization', 'Bearer: ' + token)
          .send({ techStackName: 'Java', techStackDesciption: 'java', techStackStatus: 'active' })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.message.should.have.property('code').eql('TECH_STACK_EXIST');
            done();
          });
      });

      it('it should respone code: 400, messagecode: TECH_STACK_EXIST', (done) => {
        chai.request(app)
          .post('/techstacks')
          .set('authorization', 'Bearer: ' + token)
          .send({ techStackName: 'Java', techStackDesciption: 'java', techStackStatus: 'active' })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.message.should.have.property('code').eql('TECH_STACK_EXIST');
            done();
          });
      });
    });

    //Find tech stack by name
    describe('Find Tech Stack By Name', () => {

      it('it should get tech stack', (done) => {
        chai.request(app)
          .get('/techstacks')
          .set('authorization', 'Bearer: ' + token)
          .send({ techStackName: 'Java' })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.message.should.have.property('code').eql('FIND_TECH_STACK_SUCCESS');
            done();
          });
      });

      it('it should respone code: 400, messagecode: TECH_STACK_INPUT_INVALID', (done) => {
        chai.request(app)
          .get('/techstacks')
          .set('authorization', 'Bearer: ' + token)
          .send({ techStackName: '' })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.message.should.have.property('code').eql('TECH_STACK_INPUT_INVALID');
            done();
          });
      });

      it('it should respone code: 400, messagecode: FIND_TECH_STACK_FAILED', (done) => {
        chai.request(app)
          .get('/techstacks')
          .set('authorization', 'Bearer: ' + token)
          .send({ techStackName: 'abcdefxyz' })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.message.should.have.property('code').eql('FIND_TECH_STACK_FAILED');
            done();
          });
      });
    });

    //Find tech stack
    describe('Find Tech Stack', () => {

      it('it should get tech stack', (done) => {
        chai.request(app)
          .get('/techstacks/' + teckStackId)
          .set('authorization', 'Bearer: ' + token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.message.should.have.property('code').eql('FIND_TECH_STACK_SUCCESS');
            done();
          });
      });

      it('it should respone code: 500, messagecode: SERVER_ERROR', (done) => {
        chai.request(app)
          .get('/techstacks/' + 'teckStackId')
          .set('authorization', 'Bearer: ' + token)
          .end((err, res) => {
            res.should.have.status(500);
            res.body.message.should.have.property('code').eql('SERVER_ERROR');
            done();
          });
      });

      it('it should respone code: 400, messagecode: FIND_TECH_STACK_FAILED', (done) => {
        chai.request(app)
          .get('/techstacks/' + '5f7d387cbc93490244e6e5c5')
          .set('authorization', 'Bearer: ' + token)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.message.should.have.property('code').eql('FIND_TECH_STACK_FAILED');
            done();
          });
      });
    });

    //Update tech stack
    describe('Update Tech Stack', () => {

      it('it should update tech stack', (done) => {
        chai.request(app)
          .put('/techstacks/' + teckStackId)
          .set('authorization', 'Bearer: ' + token)
          .send({ techStackName: 'abc', techStackDesciption: 'java', techStackStatus: 'active' })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.message.should.have.property('code').eql('UPDATE_TECH_STACK_SUCCESS');
            done();
          });
      });

      it('it should respone code: 500, messagecode: SERVER_ERROR', (done) => {
        chai.request(app)
          .put('/techstacks/' + 'teckStackId')
          .set('authorization', 'Bearer: ' + token)
          .end((err, res) => {
            res.should.have.status(500);
            res.body.message.should.have.property('code').eql('SERVER_ERROR');
            done();
          });
      });
    });

    //Delete tech stack
    describe('Delete Project Status', () => {

      it('it should delete tech stack', (done) => {
        chai.request(app)
          .delete('/techstacks/' + teckStackId)
          .set('authorization', 'Bearer: ' + token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.message.should.have.property('code').eql('DELETE_TECH_STACK_SUCCESS');
            done();
          });
      });

      it('it should respone code: 400, messagecode: DELETE_TECH_STACK_FAILED', (done) => {
        chai.request(app)
          .delete('/techstacks/' + '5f7d387cbc93490244e6e5c5')
          .set('authorization', 'Bearer: ' + token)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.message.should.have.property('code').eql('DELETE_TECH_STACK_FAILED');
            done();
          });
      });

      it('it should respone code: 500, messagecode: SERVER_ERROR', (done) => {
        chai.request(app)
          .delete('/techstacks/' + 'teckStackId')
          .set('authorization', 'Bearer: ' + token)
          .end((err, res) => {
            res.should.have.status(500);
            res.body.message.should.have.property('code').eql('SERVER_ERROR');
            done();
          });
      });
    });

  });

  describe('Project', () => {
    //Create project
    describe('Create Project', () => {

      it('it should create project', (done) => {
        chai.request(app)
          .post('/projects')
          .set('authorization', 'Bearer: ' + token)
          .send({
            projectName: 'Setel',
            projectKind: '5f6da7cfffe8b61f0c18b733',
            projectStatus: '5f6da94f51971f2cb05aed55',
            projectTeckStack: ['5f768fd82be67f0b787a511c', '5f75a031ba63ab110044b398'],
            projectEmployee: '5f71b3e894d05922649ab9f8',
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.message.should.have.property('code').eql('CREATE_PROJECT_SUCCESS');
            projectId = res.body.data._id;
            done();
          });
      });

      it('it should respone code: 400, messagecode: PROJECT_INPUT_INVALID', (done) => {
        chai.request(app)
          .post('/projects')
          .set('authorization', 'Bearer: ' + token)
          .send({
            projectName: '',
            projectKind: '5f6da7cfffe8b61f0c18b733',
            projectStatus: '5f6da96751971f2cb05aed56',
            projectTeckStack: ['5f6c4923eae2e41c4862f185', '5f6c488aefdcde1e7c8671f1'],
            projectEmployee: '5f71b3e894d05922649ab9f8',
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.message.should.have.property('code').eql('PROJECT_INPUT_INVALID');
            done();
          });
      });

      it('it should respone code: 400, messagecode: PROJECT_EXIST', (done) => {
        chai.request(app)
          .post('/projects')
          .set('authorization', 'Bearer: ' + token)
          .send({
            projectName: 'Setel',
            projectKind: '5f6da7cfffe8b61f0c18b733',
            projectStatus: '5f6da96751971f2cb05aed56',
            projectTeckStack: ['5f6c4923eae2e41c4862f185', '5f6c488aefdcde1e7c8671f1'],
            projectEmployee: '5f71b3e894d05922649ab9f8',
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.message.should.have.property('code').eql('PROJECT_EXIST');
            done();
          });
      });

      it('it should respone code: 400, messagecode: FIND_TECH_STACK_FAILED', (done) => {
        chai.request(app)
          .post('/projects')
          .set('authorization', 'Bearer: ' + token)
          .send({
            projectName: 'abc',
            projectKind: '5f6da7cfffe8b61f0c18b733',
            projectStatus: '5f6da96751971f2cb05aed56',
            projectTeckStack: ['5f7d387cbc93490244e6e5c5', '5f6c488aefdcde1e7c8671f1'],
            projectEmployee: '5f71b3e894d05922649ab9f8',
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.message.should.have.property('code').eql('FIND_TECH_STACK_FAILED');
            done();
          });
      });

      it('it should respone code: 400, messagecode: FIND_PROJECT_KIND_FAILED', (done) => {
        chai.request(app)
          .post('/projects')
          .set('authorization', 'Bearer: ' + token)
          .send({
            projectName: 'abc',
            projectKind: '5f7d387cbc93490244e6e5c6',
            projectStatus: '5f6da96751971f2cb05aed56',
            projectTeckStack: ['5f768fd82be67f0b787a511c', '5f75a031ba63ab110044b398'],
            projectEmployee: '5f71b3e894d05922649ab9f8',
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.message.should.have.property('code').eql('FIND_PROJECT_KIND_FAILED');
            done();
          });
      });

      it('it should respone code: 400, messagecode: FIND_PROJECT_STATUS_FAILED', (done) => {
        chai.request(app)
          .post('/projects')
          .set('authorization', 'Bearer: ' + token)
          .send({
            projectName: 'abc',
            projectKind: '5f6da7cfffe8b61f0c18b733',
            projectStatus: '5f7d387cbc93490244e6e5c5',
            projectTeckStack: ['5f768fd82be67f0b787a511c', '5f75a031ba63ab110044b398'],
            projectEmployee: '5f71b3e894d05922649ab9f8',
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.message.should.have.property('code').eql('FIND_PROJECT_STATUS_FAILED');
            done();
          });
      });
    });

    //Find project by name
    describe('Find Project By Name', () => {

      it('it should get project', (done) => {
        chai.request(app)
          .get('/projects')
          .set('authorization', 'Bearer: ' + token)
          .send({ projectName: 'Setel' })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.message.should.have.property('code').eql('FIND_PROJECT_SUCCESS');
            done();
          });
      });

      it('it should respone code: 400, messagecode: PROJECT_INPUT_INVALID', (done) => {
        chai.request(app)
          .get('/projects')
          .set('authorization', 'Bearer: ' + token)
          .send({ projectName: '' })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.message.should.have.property('code').eql('PROJECT_INPUT_INVALID');
            done();
          });
      });

      it('it should respone code: 400, messagecode: FIND_PROJECT_FAILED', (done) => {
        chai.request(app)
          .get('/projects')
          .set('authorization', 'Bearer: ' + token)
          .send({ projectName: 'abcdefxyz' })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.message.should.have.property('code').eql('FIND_PROJECT_FAILED');
            done();
          });
      });
    });

    //Find project
    describe('Find Project', () => {

      it('it should get project', (done) => {
        chai.request(app)
          .get('/projects/' + projectId)
          .set('authorization', 'Bearer: ' + token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.message.should.have.property('code').eql('FIND_PROJECT_SUCCESS');
            done();
          });
      });

      it('it should respone code: 500, messagecode: SERVER_ERROR', (done) => {
        chai.request(app)
          .get('/projects/' + 'projectId')
          .set('authorization', 'Bearer: ' + token)
          .end((err, res) => {
            res.should.have.status(500);
            res.body.message.should.have.property('code').eql('SERVER_ERROR');
            done();
          });
      });

      it('it should respone code: 400, messagecode: FIND_PROJECT_FAILED', (done) => {
        chai.request(app)
          .get('/projects/' + '5f7d387cbc93490244e6e5c5')
          .set('authorization', 'Bearer: ' + token)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.message.should.have.property('code').eql('FIND_PROJECT_FAILED');
            done();
          });
      });
    });

    //Update project
    describe('Update Project', () => {

      it('it should update project', (done) => {
        chai.request(app)
          .put('/projects/' + projectId)
          .set('authorization', 'Bearer: ' + token)
          .send({
            projectName: 'abc',
            projectKind: '5f6da7cfffe8b61f0c18b733',
            projectStatus: '5f6da96751971f2cb05aed56',
            projectTeckStack: ['5f6c4923eae2e41c4862f185', '5f6c488aefdcde1e7c8671f1'],
            projectEmployee: '5f71b3e894d05922649ab9f8',
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.message.should.have.property('code').eql('UPDATE_PROJECT_SUCCESS');
            done();
          });
      });

      it('it should respone code: 500, messagecode: SERVER_ERROR', (done) => {
        chai.request(app)
          .put('/projects/' + 'projectId')
          .set('authorization', 'Bearer: ' + token)
          .end((err, res) => {
            res.should.have.status(500);
            res.body.message.should.have.property('code').eql('SERVER_ERROR');
            done();
          });
      });
    });

    //Delete project
    describe('Delete Project Status', () => {

      it('it should delete project', (done) => {
        chai.request(app)
          .delete('/projects/' + projectId)
          .set('authorization', 'Bearer: ' + token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.message.should.have.property('code').eql('DELETE_PROJECT_SUCCESS');
            done();
          });
      });

      it('it should respone code: 400, messagecode: DELETE_PROJECT_FAILED', (done) => {
        chai.request(app)
          .delete('/projects/' + '5f7d387cbc93490244e6e5c5')
          .set('authorization', 'Bearer: ' + token)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.message.should.have.property('code').eql('DELETE_PROJECT_FAILED');
            done();
          });
      });

      it('it should respone code: 500, messagecode: SERVER_ERROR', (done) => {
        chai.request(app)
          .delete('/projects/' + 'projectId')
          .set('authorization', 'Bearer: ' + token)
          .end((err, res) => {
            res.should.have.status(500);
            res.body.message.should.have.property('code').eql('SERVER_ERROR');
            done();
          });
      });
    });

  });

  describe('Department', () => {
    //Create project
    describe('Create Department', () => {

      it('it should create project', (done) => {
        chai.request(app)
          .post('/departments')
          .set('authorization', 'Bearer: ' + token)
          .send({
            departmentName: 'C6',
            departmentResponsibility: 'Web, mobile, ios',
            departmentTechStack: ['5f768fd82be67f0b787a511c', '5f75a031ba63ab110044b398'],
            departmentProject: ['5f715243d04ae415dca77855'],
            departmentEmployee: ['5f71b3e894d05922649ab9f8'],
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.message.should.have.property('code').eql('CREATE_DEPARTMENT_SUCCESS');
            departmentId = res.body.data._id;
            done();
          });
      });

      it('it should respone code: 400, messagecode: DEPARTMENT_INPUT_INVALID', (done) => {
        chai.request(app)
          .post('/departments')
          .set('authorization', 'Bearer: ' + token)
          .send({
            departmentName: '',
            departmentResponsibility: 'Web, mobile, ios',
            departmentTechStack: ['5f768fd82be67f0b787a511c', '5f75a031ba63ab110044b398'],
            departmentProject: ['5f715243d04ae415dca77855'],
            departmentEmployee: ['5f71b3e894d05922649ab9f8'],
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.message.should.have.property('code').eql('DEPARTMENT_INPUT_INVALID');
            done();
          });
      });

      it('it should respone code: 400, messagecode: DEPARTMENT_EXIST', (done) => {
        chai.request(app)
          .post('/departments')
          .set('authorization', 'Bearer: ' + token)
          .send({
            departmentName: 'C6',
            departmentResponsibility: 'Web, mobile, ios',
            departmentTechStack: ['5f768fd82be67f0b787a511c', '5f75a031ba63ab110044b398'],
            departmentProject: ['5f715243d04ae415dca77855'],
            departmentEmployee: ['5f71b3e894d05922649ab9f8'],
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.message.should.have.property('code').eql('DEPARTMENT_EXIST');
            done();
          });
      });

      it('it should respone code: 400, messagecode: FIND_TECH_STACK_FAILED', (done) => {
        chai.request(app)
          .post('/departments')
          .set('authorization', 'Bearer: ' + token)
          .send({
            departmentName: 'abc',
            departmentResponsibility: 'Web, mobile, ios',
            departmentTechStack: ['5f768fd82be67f0b787a511a', '5f75a031ba63ab110044b398'],
            departmentProject: ['5f715243d04ae415dca77855'],
            departmentEmployee: ['5f71b3e894d05922649ab9f8'],
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.message.should.have.property('code').eql('FIND_TECH_STACK_FAILED');
            done();
          });
      });

      it('it should respone code: 400, messagecode: FIND_PROJECT_FAILED', (done) => {
        chai.request(app)
          .post('/departments')
          .set('authorization', 'Bearer: ' + token)
          .send({
            departmentName: 'abc',
            departmentResponsibility: 'Web, mobile, ios',
            departmentTechStack: ['5f768fd82be67f0b787a511c', '5f75a031ba63ab110044b398'],
            departmentProject: ['5f715243d04ae415dca7785a'],
            departmentEmployee: ['5f71b3e894d05922649ab9f8'],
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.message.should.have.property('code').eql('FIND_PROJECT_FAILED');
            done();
          });
      });

      it('it should respone code: 400, messagecode: FIND_EMPLOYEE_FAILED', (done) => {
        chai.request(app)
          .post('/departments')
          .set('authorization', 'Bearer: ' + token)
          .send({
            departmentName: 'abc',
            departmentResponsibility: 'Web, mobile, ios',
            departmentTechStack: ['5f768fd82be67f0b787a511c', '5f75a031ba63ab110044b398'],
            departmentProject: ['5f715243d04ae415dca77855'],
            departmentEmployee: ['5f71b3e894d05922649ab9fa'],
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.message.should.have.property('code').eql('FIND_EMPLOYEE_FAILED');
            done();
          });
      });
    });

    //Find department by name
    describe('Find Department By Name', () => {

      it('it should get department', (done) => {
        chai.request(app)
          .get('/departments')
          .set('authorization', 'Bearer: ' + token)
          .send({ departmentName: 'C6' })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.message.should.have.property('code').eql('FIND_DEPARTMENT_SUCCESS');
            done();
          });
      });

      it('it should respone code: 400, messagecode: DEPARTMENT_INPUT_INVALID', (done) => {
        chai.request(app)
          .get('/departments')
          .set('authorization', 'Bearer: ' + token)
          .send({ departmentName: '' })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.message.should.have.property('code').eql('DEPARTMENT_INPUT_INVALID');
            done();
          });
      });

      it('it should respone code: 400, messagecode: FIND_DEPARTMENT_FAILED', (done) => {
        chai.request(app)
          .get('/departments')
          .set('authorization', 'Bearer: ' + token)
          .send({ departmentName: 'abcdefxyz' })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.message.should.have.property('code').eql('FIND_DEPARTMENT_FAILED');
            done();
          });
      });
    });

    //Find department
    describe.skip('Find Department', () => {

      it('it should get department', (done) => {
        chai.request(app)
          .get('/departments/' + departmentId)
          .set('authorization', 'Bearer: ' + token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.message.should.have.property('code').eql('FIND_DEPARTMENT_SUCCESS');
            done();
          });
      });

      it('it should respone code: 400, messagecode: FIND_DEPARTMENT_FAILED', (done) => {
        chai.request(app)
          .get('/departments/' + '5f7d387cbc93490244e6e5c5')
          .set('authorization', 'Bearer: ' + token)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.message.should.have.property('code').eql('FIND_DEPARTMENT_FAILED');
            done();
          });
      });
    });

    //Update department
    describe.skip('Update Department', () => {

      it('it should update department', (done) => {
        chai.request(app)
          .put('/departments/' + departmentId)
          .set('authorization', 'Bearer: ' + token)
          .send({
            departmentName: 'abc',
            departmentResponsibility: 'Web, mobile, ios',
            departmentTechStack: ['5f768fd82be67f0b787a511c', '5f75a031ba63ab110044b398'],
            departmentProject: ['5f715243d04ae415dca77855'],
            departmentEmployee: ['5f71b3e894d05922649ab9f8'],
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.message.should.have.property('code').eql('UPDATE_DEPARTMENT_SUCCESS');
            done();
          });
      });

      it('it should respone code: 500, messagecode: SERVER_ERROR', (done) => {
        chai.request(app)
          .put('/departments/' + 'departmentId')
          .set('authorization', 'Bearer: ' + token)
          .end((err, res) => {
            res.should.have.status(500);
            res.body.message.should.have.property('code').eql('SERVER_ERROR');
            done();
          });
      });
    });

    //Delete department
    describe.skip('Delete Department Status', () => {

      it('it should delete department', (done) => {
        chai.request(app)
          .delete('/departments/' + departmentId)
          .set('authorization', 'Bearer: ' + token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.message.should.have.property('code').eql('DELETE_DEPARTMENT_SUCCESS');
            done();
          });
      });

      it('it should respone code: 400, messagecode: DELETE_DEPARTMENT_FAILED', (done) => {
        chai.request(app)
          .delete('/departments/' + '5f7d387cbc93490244e6e5c5')
          .set('authorization', 'Bearer: ' + token)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.message.should.have.property('code').eql('DELETE_DEPARTMENT_FAILED');
            done();
          });
      });

    });

  });

  describe('Employee', () => {
    //Create employee
    describe('Create Employee', () => {

      it('it should create employee', (done) => {
        chai.request(app)
          .post('/employees')
          .set('authorization', 'Bearer: ' + token)
          .send({
            employeeName: 'Pham Van Nam',
            employeeBirthDay: '1998-12-14',
            employeeNumber: '017433779',
            employeePhone: '0349848282',
            employeeAddress: 'Ha Noi',
            employeeCertificate: 'Dai hoc',
            employeeForeignlanguage: 'English',
            employeeTechStack: [
              {
                techStackId: '5f768fd82be67f0b787a511c',
                techStackFrameWork: 'Iris',
                techStackExperience: '1 year',
              },
              {
                techStackId: '5f75a031ba63ab110044b398',
                techStackFrameWork: 'Express',
                techStackExperience: '2 year',
              },
            ],
            employeeProject: ['5f715243d04ae415dca77855'],
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.message.should.have.property('code').eql('CREATE_EMPLOYEE_SUCCESS');
            employeeId = res.body.data._id;
            done();
          });
      });

      it('it should respone code: 400, messagecode: EMPLOYEE_INPUT_INVALID', (done) => {
        chai.request(app)
          .post('/employees')
          .set('authorization', 'Bearer: ' + token)
          .send({
            employeeName: '',
            employeeBirthDay: 'Web, mobile, ios',
            employeeNumber: '',
            employeePhone: '',
            employeeAddress: '',
            employeeCertificate: '',
            employeeForeignlanguage: '',
            employeeTechStack: [
              {
                techStackId: '5f768fd82be67f0b787a511c',
                techStackFrameWork: 'Iris',
                techStackExperience: '1 year',
              },
              {
                techStackId: '5f75a031ba63ab110044b398',
                techStackFrameWork: 'Express',
                techStackExperience: '2 year',
              },
            ],
            employeeProject: ['5f715243d04ae415dca77855'],
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.message.should.have.property('code').eql('EMPLOYEE_INPUT_INVALID');
            done();
          });
      });

      it('it should respone code: 400, messagecode: EMPLOYEE_EXIST', (done) => {
        chai.request(app)
          .post('/employees')
          .set('authorization', 'Bearer: ' + token)
          .send({
            employeeName: 'Pham Van Nam',
            employeeBirthDay: '1998-12-14',
            employeeNumber: '017433779',
            employeePhone: '0349848282',
            employeeAddress: 'Ha Noi',
            employeeCertificate: 'Dai hoc',
            employeeForeignlanguage: 'English',
            employeeTechStack: [
              {
                techStackId: '5f768fd82be67f0b787a511c',
                techStackFrameWork: 'Iris',
                techStackExperience: '1 year',
              },
              {
                techStackId: '5f75a031ba63ab110044b398',
                techStackFrameWork: 'Express',
                techStackExperience: '2 year',
              },
            ],
            employeeProject: ['5f715243d04ae415dca77855'],
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.message.should.have.property('code').eql('EMPLOYEE_EXIST');
            done();
          });
      });

      it('it should respone code: 400, messagecode: FIND_TECH_STACK_FAILED', (done) => {
        chai.request(app)
          .post('/employees')
          .set('authorization', 'Bearer: ' + token)
          .send({
            employeeName: 'abc',
            employeeBirthDay: '1998-12-14',
            employeeNumber: '017433779',
            employeePhone: '0349848282',
            employeeAddress: 'Ha Noi',
            employeeCertificate: 'Dai hoc',
            employeeForeignlanguage: 'English',
            employeeTechStack: [
              {
                techStackId: '5f768fd82be67f0b787a511a',
                techStackFrameWork: 'Iris',
                techStackExperience: '1 year',
              },
              {
                techStackId: '5f75a031ba63ab110044b398',
                techStackFrameWork: 'Express',
                techStackExperience: '2 year',
              },
            ],
            employeeProject: ['5f715243d04ae415dca77855'],
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.message.should.have.property('code').eql('FIND_TECH_STACK_FAILED');
            done();
          });
      });

      it('it should respone code: 400, messagecode: FIND_PROJECT_FAILED', (done) => {
        chai.request(app)
          .post('/employees')
          .set('authorization', 'Bearer: ' + token)
          .send({
            employeeName: 'abc',
            employeeBirthDay: '1998-12-14',
            employeeNumber: '017433779',
            employeePhone: '0349848282',
            employeeAddress: 'Ha Noi',
            employeeCertificate: 'Dai hoc',
            employeeForeignlanguage: 'English',
            employeeTechStack: [
              {
                techStackId: '5f768fd82be67f0b787a511c',
                techStackFrameWork: 'Iris',
                techStackExperience: '1 year',
              },
              {
                techStackId: '5f75a031ba63ab110044b398',
                techStackFrameWork: 'Express',
                techStackExperience: '2 year',
              },
            ],
            employeeProject: ['5f715243d04ae415dca77890'],
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.message.should.have.property('code').eql('FIND_PROJECT_FAILED');
            done();
          });
      });

    });

    //Find employee by name
    describe('Find Employee By Name', () => {

      it('it should get employee', (done) => {
        chai.request(app)
          .get('/employees')
          .set('authorization', 'Bearer: ' + token)
          .send({ employeeName: 'Pham Van Nam' })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.message.should.have.property('code').eql('FIND_EMPLOYEE_SUCCESS');
            done();
          });
      });

      it('it should respone code: 400, messagecode: EMPLOYEE_INPUT_INVALID', (done) => {
        chai.request(app)
          .get('/employees')
          .set('authorization', 'Bearer: ' + token)
          .send({ employeeName: '' })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.message.should.have.property('code').eql('EMPLOYEE_INPUT_INVALID');
            done();
          });
      });

      it('it should respone code: 400, messagecode: FIND_EMPLOYEE_FAILED', (done) => {
        chai.request(app)
          .get('/employees')
          .set('authorization', 'Bearer: ' + token)
          .send({ employeeName: 'xyz' })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.message.should.have.property('code').eql('FIND_EMPLOYEE_FAILED');
            done();
          });
      });
    });

    //Find employee
    describe('Find Employee', () => {

      it('it should get employee', (done) => {
        chai.request(app)
          .get('/employees/' + employeeId)
          .set('authorization', 'Bearer: ' + token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.message.should.have.property('code').eql('FIND_EMPLOYEE_SUCCESS');
            done();
          });
      });

      it('it should respone code: 400, messagecode: FIND_EMPLOYEE_FAILED', (done) => {
        chai.request(app)
          .get('/employees/' + '5f7d387cbc93490244e6e5c5')
          .set('authorization', 'Bearer: ' + token)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.message.should.have.property('code').eql('FIND_EMPLOYEE_FAILED');
            done();
          });
      });
    });

    //Update employee
    describe('Update Employee', () => {

      it('it should update employee', (done) => {
        chai.request(app)
          .put('/employees/' + employeeId)
          .set('authorization', 'Bearer: ' + token)
          .send({
            employeeName: 'abc',
            employeeBirthDay: '1998-12-14',
            employeeNumber: '017433779',
            employeePhone: '0349848282',
            employeeAddress: 'Ha Noi',
            employeeCertificate: 'Dai hoc',
            employeeForeignlanguage: 'English',
            employeeTechStack: [
              {
                techStackId: '5f768fd82be67f0b787a511c',
                techStackFrameWork: 'Iris',
                techStackExperience: '1 year',
              },
              {
                techStackId: '5f75a031ba63ab110044b398',
                techStackFrameWork: 'Express',
                techStackExperience: '2 year',
              },
            ],
            employeeProject: ['5f715243d04ae415dca77855'],
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.message.should.have.property('code').eql('UPDATE_EMPLOYEE_SUCCESS');
            done();
          });
      });

      it('it should respone code: 500, messagecode: SERVER_ERROR', (done) => {
        chai.request(app)
          .put('/employees/' + 'employeeId')
          .set('authorization', 'Bearer: ' + token)
          .end((err, res) => {
            res.should.have.status(500);
            res.body.message.should.have.property('code').eql('SERVER_ERROR');
            done();
          });
      });
    });

    //Delete employee
    describe('Delete Employee Status', () => {

      it('it should delete employee', (done) => {
        chai.request(app)
          .delete('/employees/' + employeeId)
          .set('authorization', 'Bearer: ' + token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.message.should.have.property('code').eql('DELETE_EMPLOYEE_SUCCESS');
            done();
          });
      });

      it('it should respone code: 400, messagecode: DELETE_EMPLOYEE_FAILED', (done) => {
        chai.request(app)
          .delete('/employees/' + '5f7d387cbc93490244e6e5c5')
          .set('authorization', 'Bearer: ' + token)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.message.should.have.property('code').eql('DELETE_EMPLOYEE_FAILED');
            done();
          });
      });

    });

  });

});
