const express = require('express');
const morgan = require('morgan');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
app.use(express.json());

app.all('/pokemon', (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
});

app.get('/pokemon', (req, res) => {
    res.end('Will send all the pokemon to you');
});

app.post('/pokemon', (req, res) => {
    res.end(`Will add the pokemon: ${req.body.name} with description: ${req.body.description}`);
});

app.put('/pokemon', (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /pokemon');
});

app.delete('/pokemon', (req, res) => {
    res.end('Deleting all pokemon');
});

app.get('/pokemon/:pokemonId', (req, res) => {
    res.end(`Will send details of the pokemon: ${req.params.pokemonId} to you`);
});

app.post('/pokemon/:pokemonId', (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /pokemon/${req.params.pokemonId}`);
});

app.put('/pokemon/:pokemonId', (req, res) => {
    res.write(`Updating the pokemon: ${req.params.pokemonId}\n`);
    res.end(`Will update the pokemon: ${req.body.name}
        with description: ${req.body.description}`);
});

app.delete('/pokemon/:pokemonId', (req, res) => {
    res.end(`Deleting pokemon: ${req.params.pokemonId}`);
});

app.use(express.static(__dirname + '/public'));

app.use((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});