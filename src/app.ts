import { ShapeStore } from './store/ShapeStore';
import { FigureType } from './types/FigureType';

function getShapesFromMatrix(matrix: number[][]): FigureType[] {
  const figureMatrix = new ShapeStore(matrix).figureMatrix;

  return figureMatrix;
}

export default getShapesFromMatrix;