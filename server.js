const express = require('express');
require('dotenv').config();
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '15kb' }));
app.use(express.static(path.join(__dirname, 'src/public')));

app.get(['/', '/index.html'], (req, res) => {
    res.sendFile(path.join(__dirname, 'src/public', 'index.html'));
});

app.use((req,res)=>{
    res.send('<h1>OOPS! Invalid request HTTP ERROR 404</h1>')
})


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
