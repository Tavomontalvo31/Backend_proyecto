const { generateBol } = require('../services/shipmentDocs');

exports.createLoad = async (req, res) => {
    const { selectedCarrier, loadDetails } = req.body;

    const resultado = generateBol({
        carrier: selectedCarrier,
        shipper: loadDetails.shipper,
        consignee: loadDetails.consignee,
        weight: loadDetails.weight,
        dimensions: loadDetails.dimensions,
        handlingUnit: loadDetails.handlingUnit,
        quantity: loadDetails.quantity,
        freightClass: loadDetails.class,
        commodity: loadDetails.commodity,
        labelBaseURL: 'https://miapp.com/labels'
    });

    if (resultado.error) {
        return res.status(400).json({
            mensaje: resultado.msg,
            camposFaltantes: resultado.missingFields
        });
    }

    return res.status(200).json({
        mensaje: `BOL successfully generated for ${selectedCarrier}`,
        BOL: resultado.BOL
    });
};