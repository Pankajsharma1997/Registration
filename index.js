// Require the esstenital modules like express,express , 
const express = require('express');

// const bodyParser = require('body-parser');


// connection string for database connection 
require("./config");

//  import the Model and Schema for stoing the data in db collection/table
 const User = require('./user');

 //  import Path module for access the path of files store in the public folder 
const path = require('path');

// join() is used for the join the directory and folder 
const publicPath = path.join(__dirname,'public');
const app = express();

// Setup necessary middleware and configration 
                   
app.use(express.urlencoded({ extended: true}));                 
app.use(express.json());

//  second method  of middleware
 //   app.use(bodyParser.urlencoded({ extended: false }));  
                    //     app.use(bodyParser.json());
                                                            // First Method for register the data in the db 

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const newUser = new User({
            username,
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

// Route for registration form                                 // Second method for  Register the data in the db  
// app.post('/register', (req, res) => {

//     const newUser = new User({
//         username: req.body.username,
//         password: req.body.password
//     });

//     // Save user to MongoDB
//     newUser.save()
//         .then(user => res.send('Registration successful'))
//         .catch(err => res.status(400).send('Registration failed'));
// });
// Route for Registration form 
app.get('/',(req,resp)=>{
    resp.sendFile(`${publicPath}/index.html`);
})



// Port 
 app.listen(5000)



 