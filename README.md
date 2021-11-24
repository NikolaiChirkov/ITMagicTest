# Documentation for Test Project

## Purpose

The purpose is to find exact figures in any possible matrix.

The output must be array of arrays which contains the coordinates of top left corner of a found figure and size of a figure. 

Matrix must match next condtions: 

1. It's at least 3x3 
2. It's contains only numbers

## I/O Data

Input: number[][];
Output: [number, number, nubmer][]

## Figures to find

1. Vertical line - 1x3
2. Rectangle - 2x3
3. Square - 2x2

## Explain idea of the solution

I decided, that We shouldn't look for exact figure. Better solution is to look for lines, that make a figure

For example: better not to look for a square, but look for two horizontal lines, that has length equals to 2 cells and that has a same value in it

Also, I decided, that we will iterate through a matrix, and every cell that we'll look in exact moment will be top left corner of a required figure and also a start point for searching.

That's the idea of the solution
