const repository = require('../repository/LincrosRepository');

const LincrosService = {

    async buscarAnexos({ chaveNFe }) {
console.log('🔥 SERVICE SENDO USADO');
        if (!chaveNFe) {
            throw new Error('chaveNFe obrigatória');
        }

        const data = await repository.buscarAnexos(chaveNFe);

        return {
            success: true,
            data
        };
    },
    async downloadAnexo({ chaveNFe, nomeAnexo, codigoOcorrencia }) {

        if (!chaveNFe || !nomeAnexo || !codigoOcorrencia) {
            throw new Error('Parâmetros obrigatórios não informados');
        }

        // 🔥 regra de negócio (opcional já deixar pronto)
        if (codigoOcorrencia !== '01') {
            return {
                success: false,
                message: 'Ignorado (não é ocorrência 01)'
            };
        }

        return await repository.downloadAnexo({
            chaveNFe,
            nomeAnexo,
            codigoOcorrencia
        });
    }
};

module.exports = LincrosService;