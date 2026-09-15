import express from 'express';

const app = express();
const port = 3000;

app.get('/plain', (req, res) => {
    res.send('When using .send() the response content type is text/html. When using .json() the response content type is application/json');
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});