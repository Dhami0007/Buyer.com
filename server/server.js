const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
require('dotenv').config();
const cors = require('cors');

const app = express();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get('/', (req, res) => {
  res.json({msg:"This is an example"});
});

// Cors middleware
// Enable CORS with the specified origin
app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000' // Replace with your frontend's origin
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());

// parse application/json
app.use(bodyParser.json())

// Routes
app.use('/user', require('./routes/userRoute'));
app.use('/api', require('./routes/categoryRoute'));
app.use('/api', require('./routes/productRoute'));
app.use('/api/uploads', express.static('uploads'));

// connect mongodb
const URI = process.env.MONGODB_URL;
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then( ()=> {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.log(err)
});
