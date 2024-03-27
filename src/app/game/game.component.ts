import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Subscription } from 'rxjs';
import { HighlightDirective } from '../app-highlight.directive';
import { GameLogicService } from '../game-logic.service';

// TS decorator - defines metadata for this specific component
@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    HighlightDirective,
  ],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent implements OnDestroy {
  board: string[][];
  private winnerSubscription: Subscription;
  winner: string | null = null;

  constructor(public gameLogicService: GameLogicService) {
    this.winnerSubscription = this.gameLogicService.getWinnerObservable().subscribe((winner: string | null) => {
      if (winner) {
        setTimeout(() => {
          alert(`${winner} has won the game!`)
        }, 0);
      }
    });

    // initializes game board built in game-logic.service.ts
    this.board = this.gameLogicService.getBoard();
  }

  makeMove(row: number, col: number): void {
    this.gameLogicService.makeMove(row, col);
    this.board = this.gameLogicService.getBoard();
  }

  reset(): void {
    // resets the game built in game-logic.service.ts
    this.gameLogicService.resetGame();
    // updates board after reset
    this.board = this.gameLogicService.getBoard();
    // clears winner
    this.winner = null;
  }

  ngOnDestroy() {
    // similar to closing the file after reading/writing 
    this.winnerSubscription.unsubscribe();
  }
}
