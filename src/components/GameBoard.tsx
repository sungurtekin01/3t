import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useGameStore } from '../store/gameStore';
import { GameBoardCell } from './GameBoardCell';

export const GameBoard: React.FC = () => {
  const board = useGameStore((state) => state.board);
  const gameOver = useGameStore((state) => state.gameOver);
  const makeMove = useGameStore((state) => state.makeMove);

  const handleCellPress = (row: number, col: number) => {
    const index = row * 3 + col;
    makeMove(index);
  };

  // Render the board as a 3x3 grid
  const renderRow = (rowIndex: number) => {
    return (
      <View key={rowIndex} style={styles.row}>
        {[0, 1, 2].map((colIndex) => {
          const index = rowIndex * 3 + colIndex;
          return (
            <GameBoardCell
              key={index}
              value={board[index]}
              row={rowIndex}
              col={colIndex}
              onPress={handleCellPress}
              disabled={gameOver}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {[0, 1, 2].map((rowIndex) => renderRow(rowIndex))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
});
