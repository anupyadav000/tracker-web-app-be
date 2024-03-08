const jwt = require("jsonwebtoken");
const { User } = require("../database/user");

const authenticateUser = async (req, res, next) => {
  try {
    // Extract JWT token from the Authorization header
    if (req.headers.authorization === undefined) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const [type, token] = req.headers.authorization.split(" ");
    if (type.toLowerCase() !== "bearer") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY); // Replace 'your_secret_key' with your actual secret key

    // Check if the user exists in the database
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Attach the user object to the request for further use
    req.user = user;

    // Proceed to the next middleware/route handler
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = authenticateUser;
