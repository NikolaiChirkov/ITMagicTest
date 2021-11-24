import matrixMock from './src/mocks/mockData.json';
import getShapesFromMatrix from './src/app';

const startTime = Date.now();

getShapesFromMatrix(matrixMock);

console.log('Execution time: ' + (Date.now() - startTime));