const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const { default: axios } = require('axios');


const app = express();
app.use(bodyParser.json())
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});


app.post('/posts', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;
    const newPost = {
        id,
        title,
    };
    posts[id] = newPost;

    await axios.post('http://localhost:4005/events', {
        type: 'PostCreated',
        data: newPost
    })

    res.status(201).send(posts[id]);
});


app.post('/events', async (req, res) => {
    const { data, type } = req.body;
    console.log(data, type)

    res.status(201);
});

app.listen(4000, () => {
    console.log('Listening to Posts on 4000');
});




