export type checkHLineType = (
  arr: number[],
  startIndex: number,  
  cap: number
) => boolean;

export type checkVLineType = (
  matrix: number[][], 
  horizontalIndex: number, 
  startIndex: number,
  cap: number
) => boolean;