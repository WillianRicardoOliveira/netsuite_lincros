const service = require('../service/LincrosService');

const LincrosController = {

    health: (req, res) => {
        res.send('Servidor OK');
    },

    async buscarAnexos(req, res) {
        try {
            const result = await service.buscarAnexos(req.body);
            res.json(result);
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    },

    async downloadAnexo(req, res) {
        try {
            const result = await service.downloadAnexo(req.body);
            res.json(result);
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
};

module.exports = LincrosController;