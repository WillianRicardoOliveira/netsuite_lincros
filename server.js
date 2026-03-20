const express = require('express');

const app = express();
app.use(express.json());

app.post('/alexa', (req, res) => {

    console.log('Requisição recebida da Alexa');

    res.json({
        version: "1.0",
        response: {
            outputSpeech: {
                type: "PlainText",
                text: "Conexão funcionando com sucesso"
            },
            shouldEndSession: true
        }
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});