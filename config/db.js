const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const dbUri = process.env.DB_MONGO
        if (!dbUri) {
            throw new error("DB_MONGO environment variable is not defined");
        }
        await mongoose.connect(dbUri, {});
        console.log("Database connection successful");
    } catch (error) {
        console.log("Database connection failed", error.message);
        process.exit(1);
    }
}

module.exports = connectDB;