const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const todoRouter = require('./routes/todo.router.js');
const PORT = process.env.PORT || 5001;

/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json()); // needed for axios requests
app.use(express.urlencoded({ extended: true }));
app.use(express.static('build'));

/** ---------- EXPRESS ROUTES ---------- **/
app.use('/todo', todoRouter);

app.get('/favicon.ico', (req, res) => res.status(204));

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

/** ---------- START SERVER ---------- **/
app.listen(PORT,  () => {
    console.log('Listening on port: ', PORT);
});