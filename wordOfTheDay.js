const fs = require('fs');
const path = require('path');

// Correct path to JSON file
const dataPath = path.join(__dirname, 'word-of-the-day.json');
let data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Correct path to HTML file (assuming it's in the 'public' directory)
const htmlTemplatePath = path.join(__dirname, 'public', 'wordOfTheDay.html');

function getWordOfTheDayHtml() {
    const randomIndex = Math.floor(Math.random() * data.length);
    const randomWord = data[randomIndex];

    let htmlTemplate = fs.readFileSync(htmlTemplatePath, 'utf8');

    htmlTemplate = htmlTemplate.replace(/{{word}}/g, randomWord.word)
                               .replace(/{{category}}/g, randomWord.category)
                               .replace(/{{level}}/g, randomWord.level)
                               .replace(/{{synonym}}/g, randomWord.synonym)
                               .replace(/{{explanation}}/g, randomWord.explanation)
                               .replace(/{{example}}/g, randomWord.example);

    return htmlTemplate;
}

module.exports = getWordOfTheDayHtml;
