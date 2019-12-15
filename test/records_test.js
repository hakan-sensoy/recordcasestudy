const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../app');

chai.use(chaiHttp);

describe('Api/records tests', ()=>{
    it('Get records',(done)=>{
        const query={"startDate": "2016-01-26","endDate": "2018-02-02","minCount": 2700,"maxCount": 3000}

        chai.request(server)
            .post('/api/records')
            .type('form')
            .set('Content-Type','application/json')
            .send(query)
            .end((err,res)=>{
                res.should.have.status=(200);
                res.should.be.json;
                res.body.records.should.be.a('array');
                res.body.records[0].should.have.property('totalCount');
                res.body.records[0].should.have.property('key');  
                res.body.records[0].should.have.property('createdAt');      
                done();
            })
    })

})