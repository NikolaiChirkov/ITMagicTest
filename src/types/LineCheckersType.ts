export type CheckHLineType = (
  arr: number[],
  startIndex: number,  
  verticalIndex: number,
  cap: number
) => boolean;

export type CheckVLineType = (
  matrix: number[][], 
  horizontalIndex: number, 
  startIndex: number,
  cap: number
) => boolean;