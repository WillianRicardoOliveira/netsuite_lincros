const { port } = require('./config/env');

if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

const express = require('express');
const routes = require('./routes/routes');

const app = express();

app.use(express.json());
app.use(routes);


app.listen(port || 3000, () => {
    console.log(`🚀 Servidor rodando na porta ${port || 3000}`);
});