let mongoose = require("mongoose");
require('./model/contact');
require('./model/contact-group');
const contact = mongoose.model('Contact');
const contactGroup = require('./model/contact-group');
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('./server');
let should = chai.should();

chai.use(chaiHttp);
describe('Contact', () => {

    describe('/GET contacts', () => {
      it('it should GET all the contacts', (done) => {
        chai.request(server)
            .get('/contact')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
              done();
            });
      });
  });

  describe('/GET contact group by id', () => {
    it('it should GET only one contact', (done) => {
      chai.request(server)
        .get('/contact-group/5b76a69367d1ea454726d7db')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('/GET search contact', () => {
    it('it should give list of contacts', (done) => {
      chai.request(server)
        .get('/contact/search/user')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  }); 
});
