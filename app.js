require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const app = express();
const {router} = require('./src/routes');

const port = process.env.PORT || 8000;

// Import and execute the database connection configuration
// require('./src/config/conn')();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(fileUpload());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

//static files
app.use(`/public`, express.static(path.join(__dirname, "public")));

app.use('/api', router);
//rest

// Start the server
app.listen(port, (error) => {
    if (error) {
        console.log("error=>", error);
    } else {
        console.log(`Listening on app ${port}`);
    }
});
