const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'index.html'));
});
app.get('/teste.php', (req, res) => {
  res.sendFile(path.join(__dirname,'teste.php'));
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port: http://localhost:${port}`);
});
