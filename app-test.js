const mongoose = require("mongoose");
const server = require("./app");
const chai = require("chai");
const chaiHttp = require("chai-http");

// Assertion 
chai.should();
chai.use(chaiHttp); 

// Obtener el modelo de planetas desde app.js
const planetModel = mongoose.model('planets');

describe('Planets API Suite', () => {

    // Poblar la colección antes de los tests
    before(async () => {
        await planetModel.deleteMany({}); // limpiar colección

        const planets = [
            { id: 1, name: "Mercury", description: "...", image: "...", velocity: "47.87 km/s", distance: "57.91 million km" },
            { id: 2, name: "Venus", description: "...", image: "...", velocity: "35.02 km/s", distance: "108.2 million km" },
            { id: 3, name: "Earth", description: "...", image: "...", velocity: "29.78 km/s", distance: "149.6 million km" },
            { id: 4, name: "Mars", description: "...", image: "...", velocity: "24.07 km/s", distance: "227.9 million km" },
            { id: 5, name: "Jupiter", description: "...", image: "...", velocity: "13.07 km/s", distance: "778.5 million km" },
            { id: 6, name: "Saturn", description: "...", image: "...", velocity: "9.69 km/s", distance: "1.43 billion km" },
            { id: 7, name: "Uranus", description: "...", image: "...", velocity: "6.81 km/s", distance: "2.87 billion km" },
            { id: 8, name: "Neptune", description: "...", image: "...", velocity: "5.43 km/s", distance: "4.5 billion km" }
        ];

        await planetModel.insertMany(planets);
    });

    describe('Fetching Planet Details', () => {

        const tests = [
            { id: 1, name: "Mercury" },
            { id: 2, name: "Venus" },
            { id: 3, name: "Earth" },
            { id: 4, name: "Mars" },
            { id: 5, name: "Jupiter" },
            { id: 6, name: "Saturn" },
            { id: 7, name: "Uranus" },
            { id: 8, name: "Neptune" }
        ];

        tests.forEach(planet => {
            it(`it should fetch a planet named ${planet.name}`, (done) => {
                chai.request(server)
                    .post('/planet')
                    .send({ id: planet.id })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.have.property('id').eql(planet.id);
                        res.body.should.have.property('name').eql(planet.name);
                        done();
                    });
            });
        });

    });        
});

// Tests para otros endpoints que no dependen de la base de datos
describe('Testing Other Endpoints', () => {

    it('it should fetch OS details', (done) => {
        chai.request(server)
            .get('/os')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it('it should fetch Live Status', (done) => {
        chai.request(server)
            .get('/live')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('status').eql('live');
                done();
            });
    });

    it('it should fetch Ready Status', (done) => {
        chai.request(server)
            .get('/ready')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('status').eql('ready');
                done();
            });
    });

});
