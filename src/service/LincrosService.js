const repository = require('../repository/LincrosRepository');
const LincrosService = {
    async buscarAnexos({ chaveNFe }) {
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
        return await repository.downloadAnexo({
            chaveNFe,
            nomeAnexo,
            codigoOcorrencia
        });
    }
};
module.exports = LincrosService;