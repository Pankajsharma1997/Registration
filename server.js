const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Pandb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// Define Schema and Model
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

const User = mongoose.model('users', userSchema);

// Middleware
 app.use(bodyParser.urlencoded({ extended: false }));
 app.use(bodyParser.json());
app.use(express.json());


// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const newUser = new User({
            username,
            email,
            password
        });

        const savedUser = await newUser.save();
        console.log('User registered successfully:', savedUser);
        res.send('Registration successful!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering user');
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




