import { ShapeMatrix } from './entities/ShapeMatrix';
import { FigureType } from './types/FigureType';

function getShapesFromMatrix(matrix: number[][]): FigureType[] {
  const figuresMatrix = new ShapeMatrix(matrix).figureMatrix;

  console.table(figuresMatrix);

  return figuresMatrix;
}

export default getShapesFromMatrix;