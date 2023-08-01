// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

// Endpoint to handle game moves and state
let board = Array(9).fill(null);
let currentPlayer = 'X';

app.get('/api/board', (req, res) => {
  res.json({ board, currentPlayer });
});

app.post('/api/move', (req, res) => {
  const { index } = req.body;
  if (board[index] === null) {
    board[index] = currentPlayer;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    res.json({ board, currentPlayer });
  } else {
    res.status(400).json({ error: 'Invalid move' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
