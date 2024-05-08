const { User } = require('../models'); // Assuming your model files are in a 'models' directory
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { DataTypes , sequelize   } = require('sequelize');


// Now you can use the `sequelize` instance and `User` model in your controller functions

// Function to handle user signup
exports.signup = async (req, res) => {
  const { username, email, password, mobileNumber } = req.body;

  try {
    // Check if user with the same email or username already exists
    const userExist = await User.findOne({
      where: {
        email: email, // Search for a user with the specified email
        username: username // Search for a user with the specified username
      }
    });
    
    if (userExist) {
      return res.status(400).json({ success: false, message: 'ایمیل با نام کاربری قبلا استفاده شده است !' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      mobileNumber,
    });

    res.status(201).json({ success: true, message: 'ثبت نام با موفقیت انجام شد' });
  } catch (error) {
    console.error('Error in user signup:', error);
    res.status(500).json({ success: false, message: 'خطای اتصال اینترنت ' });
  }
};

// Function to handle user signin
exports.signin = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Find user by username
      const user = await User.findOne({
        where: {
          username: username,
        },
      });
  
      if (!user) {
        return res.status(404).json({ success: false, message: 'حساب کاربری وجود ندارد' });
      }
  
      // Validate password
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'رمز عبور همخوانی ندارد' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, "mokhtarhonarmand");
  
      // Set the token in a cookie and send it as a response
      res.cookie('token', token, { httpOnly: true }).status(200).json({ success: true, token });
    } catch (error) {
      console.error('Error in user signin:', error);
      res.status(500).json({ success: false, message: 'اشکال در سرور' });
    }
  };




exports.getUserByToken = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // دریافت توکن از هدر درخواست
    const decodedToken = jwt.verify(token, 'mokhtarhonarmand'); // رمزگذاری توکن
    const userId = decodedToken.userId; // شناسه کاربر از توکن

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'کاربر مورد نظر یافت نشد' });
    }

    res.status(200).json({ success: true, user: { 
      username: user.username,
      email: user.email,
      mobileNumber: user.mobileNumber,
      basket: user.basket,
      likedItems: user.likedItems,
      messages: user.messages,
      itemsTransited: user.itemsTransited,
      itemsInTransit: user.itemsInTransit,
      returnedItems: user.returnedItems,
      comments: user.comments,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      fullname: user.fullname,
      birthdate: user.birthdate,
      nationalcode: user.nationalcode
    } });
  } catch (error) {
    console.error('Error fetching user data by token:', error);
    res.status(500).json({ success: false, message: 'خطای سرور' });
  }
};
