const express = require('express');
const router = express.Router();

router.get('/placement-test', (req, res) => res.render('placement-test/index'));
router.get('/placement-test/listening', (req, res) => res.render('placement-test/listening'));
router.get('/placement-test/use-of-english', (req, res) => res.render('placement-test/use_of_english'));

module.exports = router;