import { performance } from 'perf_hooks';
import matrixMock from './src/mocks/mockData.json';
import getShapesFromMatrix from './src/app';

const startTime = performance.now();

getShapesFromMatrix(matrixMock);

console.log(`\nExecution time: ${(performance.now() - startTime)}\n`);