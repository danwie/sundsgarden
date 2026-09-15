import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to our furniture store.');
});

app.get('/catalog', (req, res) => {
    res.json({
      'title' : 'My furniture store.',
      'lastUpdated' : new Date().toISOString().split("T")[0],
      'categories' : {
        'Living Room' : ['Sofa','Bookshelf','TV stand'],
        'Bedroom' : ['Bed','Wardrobe'],
        'Kitchen' : ['Chair', 'Dining table'],
        'Bathroom' : ['Bathtub', 'Toilet', 'Mirror'],
      },
    });
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});