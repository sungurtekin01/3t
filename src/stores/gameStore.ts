import { create } from 'zustand';
import { AICoach } from '../utils/aiCoach';

export type Player = 'X' | 'O';
export type CellValue = Player | null;
export type Board = [
  [CellValue, CellValue, CellValue],
  [CellValue, CellValue, CellValue],
  [CellValue, CellValue, CellValue]
];
export type GameStatus = 'playing' | 'X_WINS' | 'O_WINS' | 'DRAW';

interface GameState {
  board: Board;
  currentPlayer: Player;
  gameStatus: GameStatus;
  gameMode: 'vs-friend' | 'vs-coach';
  hintCell: [number, number] | null;
  isAIThinking: boolean;

  // Actions
  makeMove: (row: number, col: number) => void;
  makeAIMove: () => void;
  resetGame: () => void;
  setGameMode: (mode: 'vs-friend' | 'vs-coach') => void;
  setHint: (cell: [number, number] | null) => void;
}

const initialBoard: Board = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

// Helper function to check game status
function checkGameStatus(board: Board, lastPlayer: Player): GameStatus {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (board[i][0] === lastPlayer && board[i][1] === lastPlayer && board[i][2] === lastPlayer) {
      return `${lastPlayer}_WINS` as GameStatus;
    }
  }

  // Check columns
  for (let j = 0; j < 3; j++) {
    if (board[0][j] === lastPlayer && board[1][j] === lastPlayer && board[2][j] === lastPlayer) {
      return `${lastPlayer}_WINS` as GameStatus;
    }
  }

  // Check diagonals
  if (board[0][0] === lastPlayer && board[1][1] === lastPlayer && board[2][2] === lastPlayer) {
    return `${lastPlayer}_WINS` as GameStatus;
  }
  if (board[0][2] === lastPlayer && board[1][1] === lastPlayer && board[2][0] === lastPlayer) {
    return `${lastPlayer}_WINS` as GameStatus;
  }

  // Check draw
  const isFull = board.every(row => row.every(cell => cell !== null));
  if (isFull) return 'DRAW';

  return 'playing';
}

export const useGameStore = create<GameState>((set, get) => ({
  board: initialBoard,
  currentPlayer: 'X',
  gameStatus: 'playing',
  gameMode: 'vs-friend',
  hintCell: null,
  isAIThinking: false,

  makeMove: (row, col) => {
    const { board, currentPlayer, gameStatus, gameMode, isAIThinking } = get();

    // Validate move
    if (gameStatus !== 'playing' || board[row][col] !== null || isAIThinking) return;

    // Update board
    const newBoard = board.map((r, i) =>
      r.map((cell, j) => (i === row && j === col ? currentPlayer : cell))
    ) as Board;

    // Check win/draw
    const newStatus = checkGameStatus(newBoard, currentPlayer);

    // Update state
    set({
      board: newBoard,
      currentPlayer: currentPlayer === 'X' ? 'O' : 'X',
      gameStatus: newStatus,
      hintCell: null, // Clear hint after move
    });

    // Trigger AI move if playing vs coach and game is still ongoing
    if (gameMode === 'vs-coach' && newStatus === 'playing') {
      get().makeAIMove();
    }
  },

  makeAIMove: () => {
    const { board, currentPlayer, gameStatus } = get();

    // Only make move if it's AI's turn (O) and game is playing
    if (gameStatus !== 'playing' || currentPlayer !== 'O') return;

    // Set AI thinking state
    set({ isAIThinking: true });

    // Calculate best move
    const aiMove = AICoach.getBestMove(board, 'O');

    if (aiMove) {
      // Update board with AI move
      const newBoard = board.map((r, i) =>
        r.map((cell, j) => (i === aiMove.row && j === aiMove.col ? 'O' : cell))
      ) as Board;

      // Check win/draw
      const newStatus = checkGameStatus(newBoard, 'O');

      // Update state
      set({
        board: newBoard,
        currentPlayer: 'X',
        gameStatus: newStatus,
        isAIThinking: false,
      });
    } else {
      // No valid move found (shouldn't happen)
      set({ isAIThinking: false });
    }
  },

  resetGame: () => set({
    board: initialBoard,
    currentPlayer: 'X',
    gameStatus: 'playing',
    hintCell: null,
  }),

  setGameMode: (mode) => set({ gameMode: mode }),
  setHint: (cell) => set({ hintCell: cell }),
}));
