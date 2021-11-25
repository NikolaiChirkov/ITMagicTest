import { IFindFigure } from "../interfaces/IFindFigure";
import { FigureType } from "../types/FigureType";
import { CheckHLineType, CheckVLineType } from "../types/LineCheckersType";
import { SetObjType } from "../types/SetObjType";

export class ShapeMatrix {
  _matrix: number[][];
  _figureMatrix: FigureType[];
  _figuresObj: {[index: string]: number};
  _matrixHeight: number;
  _matrixWidth: number;

  constructor(matrix: number[][]) {
    this._matrix = matrix;
    this._figureMatrix = [];
    this._matrixHeight = matrix.length;
    this._matrixWidth = matrix[0].length;
    this._figuresObj = {};
  }

  private setObjProp: SetObjType = (vMin, hMin, vMax, hMax, figure) => {
    for (let i = vMin; i <= vMax; i++) {
      for (let j = hMin; j <= hMax; j++)  {
        this._figuresObj[`${i},${j}`] = figure;
      }
    }
  }

  private checkVLine: CheckVLineType = (  
    matrix, 
    horizontalIndex, 
    startIndex,
    cap
  ) => {
    let i = startIndex;
    let isMatch = true;
  
    while (i <= cap) {
      if (
        matrix[i][horizontalIndex] !== matrix[startIndex][horizontalIndex] || 
        this._figuresObj[`${i},${horizontalIndex}`]
      ) {
        isMatch = false;
        break;
      }
  
      i++;
    }
  
    return isMatch;
  };

  private checkHLine: CheckHLineType = ( 
    arr, 
    startIndex, 
    verticalIndex,
    cap
  ) => { 
    let j = startIndex;
    let isMatch = true;
  
    while (j <= cap) {
      if (
        arr[j] !== arr[startIndex] || 
        this._figuresObj[`${verticalIndex},${j}`]
      ) {
        isMatch = false;
        break;
      }
  
      j++;
    }
  
    return isMatch;
  };

  private findFigure = ({ 
    label, 
    searchCondition, 
    successFn, 
    failureFn = () => null 
  }: IFindFigure) => {
    return (
      (searchCondition && successFn()) || 
      (!searchCondition && failureFn())
    );
  }

  private getFigureMatrix = (): void => {
    const width = this._matrixWidth;
    const height = this._matrixHeight;
    const matrix = this._matrix;
    const figuresObj = this._figuresObj;
    const figureMatrix = this._figureMatrix;
    const findFigure = this.findFigure;
    const checkVLine = this.checkVLine;
    const checkHLine = this.checkHLine;
    const setObjProp = this.setObjProp;

    for (let i = 0; i < height; i++) {  
      for (let j = 0; j < width; j++) { 
        const isFiguresObjProp = figuresObj[`${i},${j}`]; 

        findFigure({
          label: 'Rectangle2x3',
          searchCondition: (
            !isFiguresObjProp &&
            j < width - 1 &&
            i < height - 2 && 
            checkVLine(matrix, j, i, i + 2) &&
            checkVLine(matrix, j + 1, i, i + 2)
          ),
          successFn: () => {
            figureMatrix.push([i, j, 6]);
            setObjProp(i, j, i + 2, j + 1, 6);
          }
        });

        findFigure({
          label: 'Square2x2',
          searchCondition: (
            !isFiguresObjProp &&
            i < height - 1 &&
            j < width - 1 &&
            checkHLine(matrix[i], j, i, j + 1) && 
            checkHLine(matrix[i + 1], j, i, j + 1)
          ),
          successFn: () => {
            figureMatrix.push([i, j, 4]);
            setObjProp(i, j, i + 1, j + 1, 4);
          }
        });

        findFigure({
          label: 'VerticalLine',
          searchCondition: (
            !isFiguresObjProp &&
            i < height - 2 && 
            checkVLine(matrix, j, i, i + 2)
          ),
          successFn: () => {
            figureMatrix.push([i, j, 3]);
            setObjProp(i, j, i + 2, j, 3);
          }
        });
      }
    }
  }

  public get figureMatrix(): FigureType[] {
    this.getFigureMatrix();

    return this._figureMatrix;
  }
}
