import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public findIsland: number = 0;
  public matrixArray: number[][] = [
    [0, 0, 0, 1, 1, 0, 0, 0],
    [0, 1, 0, 0, 1, 1, 1, 0],
    [0, 1, 1, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 0],
    [1, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0]
  ];

  private newMatrixArray: number[][] = [];
  public newMatrixArrayIds: number[] = [];

  private newMatrixRow: number[] = [];
  public newMatrixRowIds: number[] = [];

  public countColumns: number = 6;
  public countRows: number = 8;

  private copyMatrixArray?: number[][];

  constructor() {}

  ngOnInit(): void {
    this.getFindIsland();
  }

  private getFindIsland(): void {
    this.copyMatrixArray = this.matrixArray.map(arr => [...arr]);
    this.findIsland = this.findNumOfIslands(this.copyMatrixArray);
  }

  private findNumOfIslands(matrix: any): number {
    let counter = 0;

    if (matrix.length === 0) {
      return 0;
    }

    for (let i = 0; i < matrix.length; i++) {
      for(let k = 0; k < matrix[i].length; k++){
        if (matrix[i][k] === 1){
          counter++;
          this.neighborChecker(matrix, i, k);
        }
      }
    }
    return counter;
  }

  private neighborChecker(matrix: any, row: number, col: number): void {
    matrix[row][col] = '';
    if (matrix[row][col - 1] === 1){
      this.neighborChecker(matrix, row, col - 1);
    }

    if (matrix[row][col + 1] === 1){
      this.neighborChecker(matrix, row, col + 1);
    }

    if (matrix?.[row - 1]?.[col] === 1){
      this.neighborChecker(matrix, row - 1 , col);
    }

    if (matrix?.[row + 1]?.[col] === 1){
      this.neighborChecker(matrix, row + 1, col + 1);
    }

    if (matrix?.[row + 1]?.[col + 1] === 1){
      this.neighborChecker(matrix, row + 1, col + 1);
    }

    if (matrix?.[row + 1]?.[col - 1] === 1){
      this.neighborChecker(matrix, row + 1, col - 1);
    }

    if (matrix?.[row - 1]?.[col + 1] === 1){
      this.neighborChecker(matrix, row - 1 , col + 1);
    }

    if (matrix?.[row - 1]?.[col - 1] === 1){
      this.neighborChecker(matrix, row - 1, col - 1);
    }
  }

  public addNewTimeMatrixArray(): void {
    this.newMatrixRow = [];
    this.newMatrixRowIds = [];

    this.newMatrixArray = [];
    this.newMatrixArrayIds = [];

    for (let i = 0; i < this.countRows; i++) {
      this.newMatrixRow.push(0);
      this.newMatrixRowIds.push(i);
    }

    for (let i = 0; i < this.countColumns; i++) {
      let arr = this.newMatrixRow.map(item => item)

      this.newMatrixArray.push(arr);
      this.newMatrixArrayIds.push(i);
    }
  }

  public changeNewTimeMatrixNum(rowId: number, numId: number): void {
    if (this.newMatrixArray[rowId][numId] === 0) {
      this.newMatrixArray[rowId][numId] = 1;
    } else {
      this.newMatrixArray[rowId][numId] = 0;
    }
  }

  public getNewTimeMatrixNum(rowId: number, numId: number): number {
    return this.newMatrixArray[rowId][numId]
  }

  public createNewMatrixArray(): void {
    this.matrixArray = this.newMatrixArray.map(arr => [...arr]);
    this.getFindIsland();

    this.newMatrixRow = [];
    this.newMatrixRowIds = [];
    this.newMatrixArray = [];
    this.newMatrixArrayIds = [];
  }
}
