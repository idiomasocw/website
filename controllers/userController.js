const moodleAPI = require('./moodleAPI');

async function loginUser(req, res) {
  const { username, password } = req.body;
  try {
    const token = await moodleAPI.getUserToken(username, password);
    if (token && (username === 'admin' || username === 'diego')) {
      req.session.isAdmin = true;
      res.redirect('/priceDiscountManager');
    } else {
      res.render('login', { error: "Invalid credentials or not an admin." });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.render('login', { error: "Credenciales inválidas. Ingresa credenciales de administrador para poder iniciar sesión." });
  }
}

function logoutUser(req, res) {
  req.session.destroy(err => {
    if (err) {
      console.error("Error in logging out:", err);
      return res.status(500).send('Error during logout');
    }
    res.redirect('/login');
  });
}

module.exports = { loginUser, logoutUser };