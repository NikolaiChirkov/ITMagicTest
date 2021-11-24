import { FigureType } from "../types/FigureType";
import { checkHLineType, checkVLineType } from "../types/LineCheckersType";
import { MapSetType } from "../types/MapSetType";

export class ShapeStore {
  _matrix: number[][];
  _figureMatrix: FigureType[];
  _figureObj: {[index: string]: number};
  _matrixHeight: number;
  _matrixWidth: number;

  constructor(matrix: number[][]) {
    this._matrix = matrix;
    this._figureMatrix = [];
    this._matrixHeight = matrix.length;
    this._matrixWidth = matrix[0].length;
    this._figureObj = {};
  }

  private mapSet: MapSetType = (vMin, hMin, vMax, hMax, figure) => {
    for (let i = vMin; i <= vMax; i++) {
      for (let j = hMin; j <= hMax; j++)  {
        this._figureObj[`${i},${j}`] = figure;
      }
    }
  }

  private checkVLine: checkVLineType = (  
    matrix, 
    horizontalIndex, 
    startIndex,
    cap
  ) => {
    let i = startIndex;
    let isMatch = true;
  
    while (i <= cap) {
      if (matrix[i][horizontalIndex] !== matrix[startIndex][horizontalIndex]) {
        isMatch = false;
        break;
      }
  
      i++;
    }
  
    return isMatch;
  };

  private checkHLine: checkHLineType = ( 
    arr, 
    startIndex, 
    cap
  ) => { 
    let i = startIndex;
    let isMatch = true;
  
    while (i <= cap) {
      if (arr[i] !== arr[startIndex]) {
        isMatch = false;
        break;
      }
  
      i++;
    }
  
    return isMatch;
  };

  private getFigureMatrix = (): void => {
    let width = this._matrixWidth;
    let height = this._matrixHeight;

    for (let i = 0; i < height; i++) {  
      for (let j = 0; j < width; j++) {          
        if (this._figureObj[`${i},${j}`]) {
          continue;
        }
  
        const isVLine =  
          i < height - 2 && 
          this.checkVLine(this._matrix, j, i, i + 2);

        const isVRectangle = 
          j < width - 1 && 
          isVLine && 
          this.checkVLine(this._matrix, j + 1, i, i + 2);

        const isLittleSquare = 
          i < height - 1 &&
          j < width - 1 &&
          this.checkHLine(this._matrix[i], j, j + 1) && 
          this.checkHLine(this._matrix[i + 1], j, j + 1);

        if (isVRectangle) {
          this._figureMatrix.push([i, j, 6]);
          this.mapSet(i, j, i + 3, j + 1, 6);
          continue;
        }

        if (isLittleSquare) {
          this._figureMatrix.push([i, j, 4]);
          this.mapSet(i, j, i + 1, j + 1, 4);
          continue;
        }
  
        if (isVLine) {
          this._figureMatrix.push([i, j, 3]);
          this.mapSet(i, j, i + 3, j, 3);
          continue;
        }
      }
    }
  }

  public get figureMatrix(): FigureType[] {
    this.getFigureMatrix();

    console.log("figureMatrix:");
    console.table(this._figureMatrix);
    console.log("\nfigureObj:");
    console.table(this._figureObj);

    return this._figureMatrix;
  }
}