const express = require('express');
const app = express();
const port = 3000;

const searchGoogle = require('./searchGoogle');

app.get('/search', (request, response) => {

    const searchQuery = request.query.searchquery;
    console.log('4', searchQuery, request.query)

    if (searchQuery != null) {

        searchGoogle(searchQuery)
            .then(results => {
                response.status(200);
                response.json(results);
            }).catch(e => {
                console.log(e)
            });
    } else {
        response.end();
    }
});

app.get('/', (req, res) => res.send('Hello World!'));


app.listen(port, () => console.log(`App listening on port ${port}!`));