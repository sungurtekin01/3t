import { create } from 'zustand';

export type CellValue = 'X' | 'O' | null;
export type Player = 'X' | 'O';
export type GameMode = 'single' | 'multi';

interface GameState {
  // Game board state
  board: CellValue[];
  currentPlayer: Player;
  gameOver: boolean;
  winner: Player | 'draw' | null;
  mode: GameMode;

  // Actions
  makeMove: (index: number) => void;
  resetGame: () => void;
  setMode: (mode: GameMode) => void;
}

// Helper function to check for winner
const checkWinner = (board: CellValue[]): Player | 'draw' | null => {
  // Winning combinations (row, col, diagonal indices)
  const winningCombinations = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal top-left to bottom-right
    [2, 4, 6], // Diagonal top-right to bottom-left
  ];

  // Check each winning combination
  for (const [a, b, c] of winningCombinations) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a] as Player;
    }
  }

  // Check for draw (all cells filled, no winner)
  if (board.every((cell) => cell !== null)) {
    return 'draw';
  }

  // Game still in progress
  return null;
};

export const useGameStore = create<GameState>((set, get) => ({
  // Initial state
  board: Array(9).fill(null),
  currentPlayer: 'X',
  gameOver: false,
  winner: null,
  mode: 'multi',

  // Make a move
  makeMove: (index: number) => {
    const { board, currentPlayer, gameOver, mode } = get();

    // Don't allow moves if game is over or cell is occupied
    if (gameOver || board[index] !== null) {
      return;
    }

    // Create new board with the move
    const newBoard = [...board];
    newBoard[index] = currentPlayer;

    // Check for winner or draw
    const result = checkWinner(newBoard);

    // Update state
    set({
      board: newBoard,
      currentPlayer: currentPlayer === 'X' ? 'O' : 'X',
      gameOver: result !== null,
      winner: result,
    });

    // AI opponent logic for single-player mode
    if (mode === 'single' && currentPlayer === 'X' && result === null) {
      // AI plays after human (X) with a delay
      setTimeout(() => {
        const state = get();
        if (state.gameOver) return;

        // Find all empty cells
        const emptyCells = state.board
          .map((cell, idx) => (cell === null ? idx : -1))
          .filter((idx) => idx !== -1);

        // Make a random move
        if (emptyCells.length > 0) {
          const randomIndex =
            emptyCells[Math.floor(Math.random() * emptyCells.length)];

          const aiBoard = [...state.board];
          aiBoard[randomIndex] = 'O';

          const aiResult = checkWinner(aiBoard);

          set({
            board: aiBoard,
            currentPlayer: 'X',
            gameOver: aiResult !== null,
            winner: aiResult,
          });
        }
      }, 500);
    }
  },

  // Reset the game
  resetGame: () => {
    set({
      board: Array(9).fill(null),
      currentPlayer: 'X',
      gameOver: false,
      winner: null,
    });
  },

  // Set game mode
  setMode: (mode: GameMode) => {
    set({ mode });
  },
}));
