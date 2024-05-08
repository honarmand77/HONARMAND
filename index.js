const express = require("express");
const cors = require('cors');
const app = express();

const db = require("./models")
app.use(express.json())
app.use(cors());
//Router
const UserRouter = require("./routes/User");
app.use("/user" , UserRouter);




db.sequelize.sync().then(() => {
    app.listen(3001, () => {
      console.log('Server is running on port 3001');
    });
  });
