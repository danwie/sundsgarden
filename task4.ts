import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/about', (req, res) => {
    res.json({
      'title' : 'My furniture store.',
      'description' : 'You need it. We\'ve got it.',
      'founded' : 2026,
      'funFact' : 'These furnitures are too expensive.',
    });
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});