import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// @Injectable marks this class as a service provider
//  - allows this service to be injected into other components

@Injectable({
  providedIn: 'root',
})

export class GameLogicService {
  private board: string[][] = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  
  private currentPlayer: 'X' | 'O' = 'X';
  //BehaviorSubject must have an initial value = current state of data
  private winner: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  getBoard() {
    return this.board;
  }

  getCurrentPlayer() {
    return this.currentPlayer;
  }

  getWinner() {
    return this.winner;
  }

  makeMove(row: number, col: number): void {
    // checks if the cell is empty and there's no winner yet
    if (this.board[row][col] === '' && this.winner.value === null) {
      // make a move
      this.board[row][col] = this.currentPlayer;
  
      // checks if this move wins the game
      if (this.checkWinner()) {
        this.winner.next(this.currentPlayer);
      } else {
        // switches the current player if no win
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
      }
    }
  }
  

  checkWinner(): boolean {
    const lines = [
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      [[0, 0], [1, 1], [2, 2]],
      [[2, 0], [1, 1], [0, 2]],
    ];
    for (let line of lines) {
      const [[x1, y1], [x2, y2], [x3, y3]] = line;
      if (
        this.board[x1][y1] &&
        this.board[x1][y1] === this.board[x2][y2] &&
        this.board[x1][y1] === this.board[x3][y3]
      ) {
        return true;
      }
    }
    return false;
  }

  getWinnerObservable() {
    return this.winner.asObservable();
  }

  resetGame(): void {
    this.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
    this.currentPlayer = 'X';
    //this.winner = null;
    this.winner.next(null);
  }
}
