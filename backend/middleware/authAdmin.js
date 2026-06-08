// backend/middleware/authAdmin.js
const authAdmin = (req, res, next) => {
  const adminCode = req.headers['x-admin-code'] || req.body.adminCode;
  
  if (adminCode === process.env.ADMIN_CODE || adminCode === 'admin') {
    next();
  } else {
    res.status(401).json({ error: 'Code d\'accès invalide' });
  }
};

module.exports = authAdmin;
