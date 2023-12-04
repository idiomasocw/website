const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'word-of-the-day.json');
let data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

function getWordOfTheDay() {
    const randomIndex = Math.floor(Math.random() * data.length);
    return data[randomIndex];
}

module.exports = getWordOfTheDay;
