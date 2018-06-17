process.env.NODE_ENV = 'test';

let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../app')
let should = chai.should()

chai.use(chaiHttp);


console.log('==========================================================');
console.log('                   ITITOCA API TESTs                      ');
console.log('==========================================================');

describe('**********USERS***********', function () {
    it('/user (GET) - Should return a 200 response', function (done) {
        chai.request(server)
            .get('/user')
            .end((err, res) => {
                res.should.have.status(200)
                res.should.be.json
                res.body.should.be.an('array')
                done()
            })
    })
    it('/user/delete/:pseudo (DELETE) - Should return a 200 response', function(done) {
        chai.request(server)
            .delete('/user/delete/test')
            .end((err, res) => {
                res.should.have.status(200)
                res.should.be.json
            })
            done()
    })
    it('/user/admin (POST) - Should return a 200 response', function(done) {
        let body = {
            pseudo: 'test',
            email: 'test@test.fr',
            password: 'test'
        }
        chai.request(server)
            .post('/user/admin')
            .send(body)
            .end((err, res) => {
                res.should.have.status(200)
                res.should.be.json
            })
            done()

    })
    it('/user/signup (POST) - Should return a 200 response')
    it('/user/login (POST) - Should return a 200 response')
    it('/user/disable/:id (POST) - Should return a 200 response')
    it('/user/active/:id (POST) - Should return a 200 response')
})
describe('**********CONTENT***********', function() {
    it('/content (GET) - Should return a 200 response', function (done) {
        chai.request(server)
            .get('/content')
            .end((err, res) => {
                res.should.have.status(200)
            })
            done()
    })
    it('/content/:id - Should return a 200 response')
    it('/content/publish/:id - Should return a 200 response')
    it('/content/archive/:id - Should return a 200 response\n')
    describe('- ARTICLES -', () => {
        it('/content/article (POST) - Should return a 200 response')
        it('/content/article/:id (PUT) - Should return a 200 response\n')
    })
    describe('- CHALENGES -', () => {
        it('/content/challenge (POST) - Should return a 200 response')
        it('/content/challenge/:id (PUT) - Should return a 200 response')
        it('/content/challenge/:id/contrib (POST) - Should return a 200 response')
        it('/content/challenge/ofthemonth (GET) - Should return a 200 response\n')
    })
    describe('- OHTERS -', () => {
        it('/content/:cat/ (GET) - Should return a 200 response')
        it('/content/:timeId (PUT) - Should return a 200 response')
        it('/content/:cat/:id (PUT) - Should return a 200 response')
        it('/content/:cat/:id (PUT) - Should return a 200 response')
    })
})