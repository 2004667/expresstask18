const express = require('express');
const axios = require('axios');
const app = express();
const port = 4040;

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/users', async (req, res) => {
    try {
        const response = await axios.get('https://api.slingacademy.com/v1/sample-data/users');
        const users = response.data.users;
        res.render('users', { users });
    } catch (error) {
        res.status(500).send('Ошибка при получении данных пользователей');
    }
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
