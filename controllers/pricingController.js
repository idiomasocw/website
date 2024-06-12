const fs = require('fs');
const path = require('path');

function getPricing(req, res) {
  fs.readFile(path.join(__dirname, '../pricing.json'), 'utf8', (err, data) => {
    if (err) {
      console.error("Error reading pricing.json:", err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(JSON.parse(data));
  });
}

function getCursos(req, res) {
  try {
    const pricingData = JSON.parse(fs.readFileSync(path.join(__dirname, '../pricing.json'), 'utf-8'));

    let userPriceInfo;
    if (req.session.mode === "private") {
      const lessonsKey = req.session.selectedDays + '_lessons';
      userPriceInfo = pricingData.privateLessons[lessonsKey];
    } else if (req.session.mode === "semi-private") {
      const lessonsKey = req.session.selectedIntensity + '_lessons';
      userPriceInfo = pricingData.semiPrivateLessons[lessonsKey];
    }

    res.render('cursos', { pricing: pricingData, userPriceInfo });
  } catch (error) {
    console.error("Error reading pricing.json for cursos page:", error);
    res.status(500).send("Error loading cursos page");
  }
}

function getPriceDiscountManager(req, res) {
  if (req.session.isAdmin) {
    fs.readFile(path.join(__dirname, '../pricing.json'), 'utf8', (err, data) => {
      if (err) {
        console.error("Error reading pricing file for priceDiscountManager page:", err);
        return res.status(500).send("Error loading pricing information");
      }
      const pricing = JSON.parse(data);
      res.render('priceManager', { pricing });
    });
  } else {
    res.redirect('/login');
  }
}

function postPriceDiscountManager(req, res) {
  try {
    const newPricing = req.body;
    fs.writeFileSync(path.join(__dirname, '../pricing.json'), JSON.stringify(newPricing, null, 2));
    res.redirect('/priceDiscountManager');
  } catch (error) {
    console.error("Error writing to pricing.json from priceDiscountManager:", error);
    res.status(500).send("Error updating pricing information");
  }
}

module.exports = {
  getPricing,
  getCursos,
  getPriceDiscountManager,
  postPriceDiscountManager
};
