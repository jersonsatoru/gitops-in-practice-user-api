const express = require('express')

const app = express();
app.get('/v1/users', (req, res) => {
    return res.json({
        data: [
            {id: 1, name: 'jerson satoru uyekita'},
            {id: 2, name: 'sabrina galvão bento'},
            {id: 3, name: 'batata 2'},
            {id: 4, name: 'testadno 3'},
        ]
    })
});

app.get('/v1/healthz', (req, res) => {
    return res.status(200).json({
      version: process.env.SHORT_SHA,
    })
});

const port = 4000
app.listen(port, () => {
    console.log(`Server started on ${port}`)
})
