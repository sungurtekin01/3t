import { create } from 'zustand';

type Player = 'X' | 'O';
type CellValue = Player | null;
type Board = [
  [CellValue, CellValue, CellValue],
  [CellValue, CellValue, CellValue],
  [CellValue, CellValue, CellValue]
];
type GameStatus = 'playing' | 'X_WINS' | 'O_WINS' | 'DRAW';

interface GameState {
  board: Board;
  currentPlayer: Player;
  gameStatus: GameStatus;
  gameMode: 'vs-friend' | 'vs-coach';
  hintCell: [number, number] | null;
  isAIThinking: boolean;

  // Actions
  makeMove: (row: number, col: number) => void;
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
    const { board, currentPlayer, gameStatus } = get();

    // Validate move
    if (gameStatus !== 'playing' || board[row][col] !== null) return;

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
