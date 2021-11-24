import { ShapeMatrixStore } from './store/ShapeMatrixStore';
import { FigureType } from './types/FigureType';

function getShapesFromMatrix(matrix: number[][]): FigureType[] {
  const figuresMatrix = new ShapeMatrixStore(matrix).figureMatrix;

  console.table(figuresMatrix);

  return figuresMatrix;
}

export default getShapesFromMatrix;