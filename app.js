const express = require('express');
const app = express();

app.use(express.static('public'));

// Additional routes and server setup...

const PORT = process.env.PORT || 3000;
app.listen(3000, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
