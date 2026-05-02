const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log("HEADER:", authHeader);

  if (!authHeader) {
    return res.status(401).json({ message: "No token" });
  }

  try {
    const token = authHeader.split(" ")[1];

    console.log("TOKEN:", token); 

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("DECODED:", decoded);

    req.user = decoded;

    next();
  } catch (err) {
    console.log("ERROR:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = auth;