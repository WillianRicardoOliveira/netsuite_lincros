// 🔥 IGNORA CERTIFICADO (APENAS LOCAL / REMOVER EM PRODUÇÃO)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());

const BASE_URL = 'https://deployment-tms.lincros.com';
const TOKEN = 'SEU_TOKEN_AQUI';

// 🔹 Health check
app.get('/', (req, res) => {
    res.send('Servidor OK');
});

// 🔥 DOWNLOAD + CONVERSÃO BASE64 (ROBUSTO)
app.post('/download-anexo', async (req, res) => {

    try {

        const { chaveNFe, nomeAnexo, codigoOcorrencia } = req.body;

        if (!chaveNFe || !nomeAnexo || !codigoOcorrencia) {
            return res.status(400).json({
                success: false,
                error: 'Parâmetros obrigatórios não informados'
            });
        }

        console.log('🔍 REQUEST:', {
            chaveNFe,
            nomeAnexo,
            codigoOcorrencia
        });

        const response = await axios({
            method: 'POST',
            url: `${BASE_URL}/api/ocorrencia/downloadAnexo`,
            data: {
                chaveNFe,
                nomeAnexo,
                codigoOcorrencia
            },

            // 🔥 ESSENCIAL
            responseType: 'arraybuffer',

            // 🔥 NÃO DEIXA AXIOS QUEBRAR
            validateStatus: () => true,

            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'Content-Type': 'application/json',

                // 🔥 SIMULA POSTMAN (evita bloqueio)
                'User-Agent': 'PostmanRuntime/7.32.3',
                'Accept': '*/*',
                'Connection': 'keep-alive'
            }
        });

        console.log('📡 STATUS LINCROS:', response.status);

        // 🔥 CONVERSÃO SEMPRE (independente do status)
        const base64 = Buffer.from(response.data).toString('base64');

        return res.json({
            success: response.status === 200,
            status: response.status,
            base64
        });

    } catch (error) {

        console.error('❌ ERRO CRÍTICO:', error.message);

        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://127.0.0.1:${PORT}`);
});