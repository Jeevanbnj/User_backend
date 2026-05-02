const mongoose = require('mongoose');

const connectDB = async () => {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
        console.error('Missing MONGO_URI environment variable.');
        process.exit(1);
    }

    try {
        await mongoose.connect(mongoUri);
        console.log('MongoDB Connected!!');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;