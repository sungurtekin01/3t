export enum Colors {
  white = 'white',
  black = 'black',
}

export interface Theme {
  backgroundColor: Colors;
  textColor: Colors;
  // Game-specific colors
  primaryButton: string;
  primaryButtonShadow: string;
  markerX: string;
  markerO: string;
  cellBackground: string;
  hintGlow: string;
  modalOverlay: string;
  modalContainer: string;
}
