
const express = require('express');
////////////////START///////////////////////////////
const https = require("https") // added modules
const fs = require("fs") // added modules
const path = require("path") // added modules
////////////////END////////////////////////////////
const cookieParser = require('cookie-parser');
const userRoutes = require('./Routes/UserRoute');
const questionsRoutes = require('./Routes/questionRoute');
const dbConnection = require('./Database/dbconfig');
const cors = require('cors');
const authMiddleware = require('./middleware/authMiddleware');
require('dotenv').config();

///////////////////////START//////////////////////////////////////////
// Joining and reading keys and certificate for the server
const privateKeyPath = path.join(__dirname, 'private-key-no-passphrase.pem');
const certificatePath = path.join(__dirname, 'certificate.pem');
const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
const certificate = fs.readFileSync(certificatePath, 'utf8');
///////////////////////END///////////////////////////////////////////


////////////////////////START/////////////////////////////////////////
// key and object cert for the https server
const options = {
    key: privateKey,
    cert: certificate
  };
/////////////////////////END///////////////////////////////////////



// Initialize Express app
const app = express();

// assigning port
const PORT = process.env.PORT || 5000;

// middlewares
// app.use(cors());
const corsOptions = {
	origin: 'http://localhost:5173', // Your frontend URL
	credentials: true, // Allow cookies and authorization headers
};

// Apply CORS middleware
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
// json middleware to extract json data
app.use(express.json());

// cookie parser middle ware
app.use(cookieParser());

// routes

// user routes middleware
app.use('/api/users', userRoutes);

// question routes middleware
app.use('/api/questions', authMiddleware, questionsRoutes);

// answer routes middleware

// const start = async () => {
// 	try {
// 		const result = await dbConnection.execute("select 'test' ");
// 		app.listen(PORT);
// 		// console.log(result);
// 		console.log('database connected');
// 		console.log(`server running on port ${PORT}`);
// 	} catch (error) {
// 		console.log(error.message);
// 	}
// };
// start();


////////////////////////START/////////////////////////////////////////
const start = async () => {
	try {
		const result = await dbConnection.execute("select 'test' ");
		https.createServer(options, app).listen(PORT, () =>{
			console.log('database connected')
			console.log(`server running on port ${PORT}`)
			// console.log(result)
		 })} catch (error) {
		console.log(error.message);
	}
};
start();
////////////////////////END/////////////////////////////////////////