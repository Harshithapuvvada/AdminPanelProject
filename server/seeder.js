const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Product = require('./models/Product');

dotenv.config();

mongoose.connect('mongodb://localhost:27017/ecommerce_simple', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


// Re-write to be correct:

const seed = async () => {
    try {
        await User.deleteMany();
        await Product.deleteMany();

        const userData = [
            {
                name: 'Admin User',
                email: 'admin@example.com',
                password: '123456',
                isAdmin: true
            },
            {
                name: 'John Doe',
                email: 'john@example.com',
                password: '123456',
                isAdmin: false
            }
        ];

        for (const u of userData) {
            const user = new User(u);
            await user.save();
        }

        console.log('Users Seeded');

        const sampleProducts = [
            {
                name: 'Airpods Wireless Bluetooth Headphones',
                imageUrl: 'https://placehold.co/600x400?text=Airpods',
                description:
                    'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
                category: 'Electronics',
                price: 89.99,
            },
            {
                name: 'iPhone 13 Pro 256GB Memory',
                imageUrl: 'https://placehold.co/600x400?text=iPhone+13',
                description:
                    'Introducing the iPhone 13 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life',
                category: 'Electronics',
                price: 599.99,
            },
            {
                name: 'Cannon EOS 80D DSLR Camera',
                imageUrl: 'https://placehold.co/600x400?text=Camera',
                description:
                    'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design',
                category: 'Electronics',
                price: 929.99,
            },
            {
                name: 'Sony Playstation 5',
                imageUrl: 'https://placehold.co/600x400?text=PS5',
                description:
                    'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music',
                category: 'Electronics',
                price: 399.99,
            }
        ];

        await Product.insertMany(sampleProducts);
        console.log('Products Seeded');

        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
}

seed();
