const axios = require('axios');
const { baseUrl, token } = require('../config/env');

const LincrosRepository = {

    async buscarAnexos(chaveNFe) {

        console.log('[LINCROS] buscarAnexos', { chaveNFe });

        const response = await axios.post(
            `${baseUrl}/api/ocorrencia/buscarAnexos`,
            { chaveNFe },
            {
                timeout: 10000,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                validateStatus: () => true
            }
        );

        console.log('[LINCROS] Status:', response.status);

        if (response.status !== 200) {
            throw new Error(`Erro Lincros: ${response.status}`);
        }

        return response.data;
    },

    async downloadAnexo({ chaveNFe, nomeAnexo, codigoOcorrencia }) {

        console.log('[LINCROS] downloadAnexo', { nomeAnexo });

        const response = await axios({
            method: 'POST',
            url: `${baseUrl}/api/ocorrencia/downloadAnexo`,
            data: {
                chaveNFe,
                nomeAnexo,
                codigoOcorrencia
            },
            timeout: 10000,
            responseType: 'arraybuffer',
            validateStatus: () => true,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'User-Agent': 'PostmanRuntime/7.32.3',
                'Accept': '*/*'
            }
        });

        console.log('[LINCROS] Status download:', response.status);

        const base64 = Buffer.from(response.data).toString('base64');

        return {
            success: response.status === 200,
            status: response.status,
            base64
        };
    }
};

module.exports = LincrosRepository;