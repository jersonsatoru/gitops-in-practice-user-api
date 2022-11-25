const express = require('express')

const app = express();
app.get('/v1/users', (req, res) => {
    return res.json({
        data: [
            {id: 1, name: 'jerson satoru'}
        ]
    })
});

app.get('/v1/healthz', (req, res) => {
    return res.status(200).json()
});

const port = 4000
app.listen(port, () => {
    console.log(`Server started on ${port}`)
})
