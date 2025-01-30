const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const dbURI = 'mongodb://localhost:27017/marketplace';
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
