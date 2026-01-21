const mongoose = require('mongoose');
const User = require('./models/User');
const Product = require('./models/Product');

const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce_simple', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(async () => {
        console.log('Connected to MongoDB...');

        try {
            const userCount = await User.countDocuments();
            const productCount = await Product.countDocuments();

            console.log('-----------------------------------');
            console.log(`Verified Storage Check:`);
            console.log(`Users found in DB:    ${userCount}`);
            console.log(`Products found in DB: ${productCount}`);
            console.log('-----------------------------------');

            const users = await User.find().select('name email is Admin');
            console.log('User List:', users.map(u => `${u.name} (${u.email})`));

        } catch (err) {
            console.error('Error querying DB:', err);
        } finally {
            mongoose.connection.close();
            process.exit();
        }
    })
    .catch(err => {
        console.error('Connection Error:', err);
        process.exit(1);
    });
