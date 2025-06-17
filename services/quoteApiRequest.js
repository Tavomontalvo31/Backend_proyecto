function calculateRateQuote(data) {
    const {
        Origin,
        Destination,
        Items: {
            handling_unit,
            Quantity,
            Dimensions: { Width, Height, Length, Weight, Class }
        }
    } = data;

    const baseVolume = (Width * Height * Length) / 1728;

    const carriers = [
        {
            name: "FedEx",
            calculate: (volume, weight) => {
                if (volume <= 200) volume *= 1.3;
                else if (volume <= 300) volume *= 2;
                else volume *= 5;
                return weight * 0.5 + volume * 10;
            }
        },
        {
            name: "R+L Carriers",
            calculate: (volume, weight) => {
                if (volume <= 200) volume *= 0.3;
                else if (volume <= 300) volume *= 3;
                else volume *= 7;
                return weight * 0.8 + volume * 0.9;
            }
        },
        {
            name: "AAA Cooper",
            calculate: (volume, weight) => {
                if (volume <= 200) volume *= 3;
                else if (volume <= 300) volume *= 7;
                else volume *= 8;
                return weight * 1.5 + volume * 15;
            }
        },
        {
            name: "ABF",
            calculate: (volume, weight) => {
                if (volume <= 200) volume *= 1.2;
                else if (volume <= 300) volume *= 3.4;
                else volume *= 9;
                return weight * 2 + volume * 9;
            }
        }
    ];

    return carriers
        .map(carrier => {
            const totalRate = carrier.calculate(baseVolume, Weight);
            return {
                carrier: carrier.name,
                totalRateNumber: totalRate,
                totalRate: `$${totalRate.toFixed(2)}`
            };
        })
        .sort((a, b) => a.totalRateNumber - b.totalRateNumber)
        .map(({ carrier, totalRate }) => ({ carrier, totalRate }));
}

module.exports = calculateRateQuote;

