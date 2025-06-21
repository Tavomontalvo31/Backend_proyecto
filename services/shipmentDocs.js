function generateBol({
    carrier,
    shipper,
    consignee,
    weight,
    dimensions,
    handlingUnit,
    quantity,
    freightClass,
    commodity,
    labelBaseURL
}) {
    const neededInfo = [];

    if (!shipper?.warehouseName) neededInfo.push('Shipper warehouseName');
    if (!shipper?.shipperName) neededInfo.push('Shipper name');
    if (!shipper?.shipperCompleteAddress) neededInfo.push('Shipper address');
    if (!shipper?.shipperContact) neededInfo.push('Shipper contact');

    if (!consignee?.warehouseName) neededInfo.push('Consignee warehouseName');
    if (!consignee?.consigneeName) neededInfo.push('Consignee name');
    if (!consignee?.consigneeCompleteAddress) neededInfo.push('Consignee address');
    if (!consignee?.consigneeContact) neededInfo.push('Consignee contact');

    if (!weight) neededInfo.push('Total weight');
    if (!dimensions?.length || !dimensions?.width || !dimensions?.height) neededInfo.push('Dimensions');
    if (!handlingUnit) neededInfo.push('Handling unit');
    if (!quantity) neededInfo.push('Quantity');
    if (!commodity) neededInfo.push('Commodity');
    if (!freightClass) neededInfo.push('Freight class');

    if (neededInfo.length > 0) {
        return {
            error: true,
            msg: "Missing information to generate the documents",
            missingFields: neededInfo
        };
    }

    const timestamp = Date.now();

    const BOL = {
        number: `${carrier.toUpperCase()}-${timestamp}`,
        carrier,
        shipper,
        consignee,
        weight,
        dimensions,
        handlingUnit,
        quantity,
        freightClass,
        commodity,
        date: new Date().toISOString(),
        labelURL: `${labelBaseURL}/${carrier.toLowerCase()}-${timestamp}.pdf`
    };

    return { error: false, BOL };
}

module.exports = {
    generateBol
};