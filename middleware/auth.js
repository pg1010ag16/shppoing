const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Check for access token in Authorization header
  const token = req.headers['authorization'];
  // console.log(req.headers['authorization'])
  // const token = authHeader && authHeader.split(' ')[1];
  console.log(token)


  if (!token) {
    // No token provided, return 401 Unauthorized
    return res.status(401).json({ message: 'Access token not provided' });
  }

  // Verify access token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      // Access token invalid or expired, check refresh token
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        // No refresh token provided, return 401 Unauthorized
        return res.status(401).json({ message: 'Access token expired, refresh token not provided' });
      }

      // Verify refresh token
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
          // Refresh token invalid or expired, return 401 Unauthorized
          return res.status(401).json({ message: 'Access token expired, refresh token invalid or expired' });
        }

        // Use refresh token to obtain new access token
        const newAccessToken = jwt.sign({ sub: user.sub }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        res.cookie('refreshToken', refreshToken, { httpOnly: true });
        req.user = user;
        req.token = newAccessToken;

        next();
      });
    } else {
      // Access token valid, set user and token in request object and pass to next middleware
      req.user = user;
      req.token = token;
      next();
    }
  });
}
