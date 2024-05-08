const express = require("express");
const cors = require('cors');
const app = express();

const db = require("./models")
app.use(express.json())

// Define allowed origins
const allowedOrigins = ['https://9f36-5-160-80-192.ngrok-free.app', 'https://9f36-5-160-80-192.ngrok-free.app/user/signin' ,'https://9f36-5-160-80-192.ngrok-free.app/user/signup'];

// CORS options
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'], // Allowed HTTP methods
  allowedHeaders: ['Authorization', 'Content-Type'], // Allowed headers
  credentials: true, // Enable credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));

// Router
const UserRouter = require("./routes/User");
app.use("/user" , UserRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
      console.log('Server is running on port 3001');
    });
  });
