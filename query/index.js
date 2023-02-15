const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
app.use(bodyParser.json())
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', async (req, res) => {
    const { data, type } = req.body;
    console.log(data, type)
    switch (type) {
        case 'PostCreated':
            posts[data.id] = { ...data, comments: [] };
            break;
        case 'CommentCreated':
            const { postId, id, content } = data;
            posts[postId].comments.push({ id, content });
            break;
    }
    console.log(posts)

    res.status(201);
});

app.listen(4002, () => {
    console.log('Listening to queries on 4002');
});