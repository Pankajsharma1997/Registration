// Require the esstenital modules like express,express , 
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

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
                      app.use(bodyParser.urlencoded({ extended: false }));
                        app.use(bodyParser.json());
 express.urlencoded({ extended: true});                 
app.use(express.json());

app.use(session({
         secret: 'sunil ligdi',
         resave: true,
         saveUninitialized: true
}));


// Login route
// app.post('/login',async (req, res) => {
//     const { email, password } = req.body;
//    await  User.findOne({ email }, (err,user ) => {
//     if (err) throw err;
//    // User not found
//     if (!user) {
//     return res.status(401).send('Invalid email or password');
//     }
//    // Compare the provided password with the hashed password stored in the database
//     bcrypt.compare(password, user.password, (err, result) => {
//     if (err) throw err;
//    if (result) {
//     // Store user data in session
//     req.session.user = user;
//     res.redirect('/'); // Redirect to the dashboard page after successful login
//     } else {
//     res.status(401).send('Invalid email or password');
//     }
//     });
//     });
//     });

// Route for registration form
app.post('/register', (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    // Save user to MongoDB
    newUser.save()
        .then(user => res.send('Registration successful'))
        .catch(err => res.status(400).send('Registration failed'));
});

// Route for Registration form 
app.get('/',(req,resp)=>{
    resp.sendFile(`${publicPath}/index.html`);
})

// Route for Login Page 
app.get('/login',(req,resp)=>{
    resp.sendFile(`${publicPath}/login.html`);
}) 
// //Route for login Page Authentication 
// app.post('/Login',async (req,res)=>{
//     const {email,password} =req.body;
//     try {
//         const user = await User.findOne({ email:email },(err)=>{
//             console.log(user)
//             if(user){
//                 if(password === user.password){
//                     res.send({message:"login sucess",user:user})
//                 }else{
//                     res.send({message:"wrong credentials"})
//                 }
//             }
           
//         });
//         // Handle result
//     }
    
//     catch (err) {
//         // Handle error
//         res.send("not Register");
//     }
    
//     });

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        console.log(user);

        // if (!user) {
        //     return res.status(401).send('Invalid email or password');
        // }

        const result = await bcrypt.compare(password, user.password);

        if (result) {
            req.session.user = user;
            res.redirect('/'); // Redirect to the dashboard page after successful login
        } else {
            res.status(401).send('Invalid email or password');
        }
    } catch (err) {
        // Handle any errors
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});





// Port 
 app.listen(5000)



 