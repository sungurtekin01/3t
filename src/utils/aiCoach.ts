import { Board, Player } from '../stores/gameStore';

type Position = { row: number; col: number };

/**
 * AI Coach logic for tic-tac-toe
 * Strategy: Win > Block > Random
 */
export class AICoach {
  /**
   * Calculate the best move for the AI
   */
  static getBestMove(board: Board, aiPlayer: Player): Position | null {
    // Strategy 1: Try to win
    const winningMove = this.findWinningMove(board, aiPlayer);
    if (winningMove) return winningMove;

    // Strategy 2: Block opponent's winning move
    const opponent: Player = aiPlayer === 'X' ? 'O' : 'X';
    const blockingMove = this.findWinningMove(board, opponent);
    if (blockingMove) return blockingMove;

    // Strategy 3: Choose random empty cell
    return this.getRandomMove(board);
  }

  /**
   * Find a move that would result in a win for the given player
   */
  private static findWinningMove(board: Board, player: Player): Position | null {
    // Check all empty cells
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] === null) {
          // Simulate the move
          const testBoard = this.cloneBoard(board);
          testBoard[row][col] = player;

          // Check if this move results in a win
          if (this.checkWin(testBoard, player)) {
            return { row, col };
          }
        }
      }
    }

    return null;
  }

  /**
   * Get a random empty cell
   */
  private static getRandomMove(board: Board): Position | null {
    const emptyCells: Position[] = [];

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] === null) {
          emptyCells.push({ row, col });
        }
      }
    }

    if (emptyCells.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    return emptyCells[randomIndex];
  }

  /**
   * Check if a player has won on the given board
   */
  private static checkWin(board: Board, player: Player): boolean {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (board[i][0] === player && board[i][1] === player && board[i][2] === player) {
        return true;
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (board[0][i] === player && board[1][i] === player && board[2][i] === player) {
        return true;
      }
    }

    // Check diagonals
    if (board[0][0] === player && board[1][1] === player && board[2][2] === player) {
      return true;
    }
    if (board[0][2] === player && board[1][1] === player && board[2][0] === player) {
      return true;
    }

    return false;
  }

  /**
   * Create a deep copy of the board
   */
  private static cloneBoard(board: Board): Board {
    return board.map(row => [...row]) as Board;
  }
}
