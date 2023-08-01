// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    fetchBoard();
  }, []);

  const fetchBoard = async () => {
    try {
      const response = await axios.get('/api/board');
      setBoard(response.data.board);
      setCurrentPlayer(response.data.currentPlayer);
    } catch (error) {
      console.error('Error fetching board:', error);
    }
  };

  const handleMove = async (index) => {
    if (!winner && board[index] === null) {
      try {
        const response = await axios.post('/api/move', { index });
        setBoard(response.data.board);
        setCurrentPlayer(response.data.currentPlayer);
        checkWinner(response.data.board);
      } catch (error) {
        console.error('Error making move:', error);
      }
    }
  };

  const checkWinner = (board) => {
    // Check for winning combinations
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        break;
      }
    }
  };

  const renderCell = (index) => {
    const cellValue = board[index];
    return (
      <div className="cell" onClick={() => handleMove(index)}>
        {cellValue}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <div className="board">
        {board.map((cell, index) => (
          renderCell(index)
        ))}
      </div>
      <p>Current Player: {currentPlayer}</p>
      {winner && <p>Winner: {winner}</p>}
    </div>
  );
}

export default App;
