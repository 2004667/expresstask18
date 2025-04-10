const express = require('express');
const axios = require('axios');

const app = express();
const port = 4040;

app.get('/user/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const response = await axios.get('https://api.slingacademy.com/v1/sample-data/users');
        const users = response.data.users;
        if (!users || !users[id]) {
            throw new Error(`Пользователь с ID ${id} не найден`);
        }

        const user = users[id];
        const result = {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            country: user.country,
            job: user.job,
        };

        res.json(result);

    } catch (error) {
        res.status(500).json({
            error: error.message || 'Произошла ошибка при получении данных',
        });
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
