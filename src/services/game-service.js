import { BehaviorSubject, ReplaySubject } from "rxjs";
import generateQuestions from '../question-lib/generate-questions';
import LVL_1 from '../question-lib/level-1/questions.json';



export class GameService {

    streakService;
    constructor(streakService) {
        this.streakService = streakService;
    }

    state$ = new BehaviorSubject(GameState.TITLE);
    score$ = new BehaviorSubject(0);
    correctCount$ = new BehaviorSubject(0);
    
    questions$ = new BehaviorSubject([]);
    questionIndex = 0;
    currentQuestion$ = new BehaviorSubject(1);

    // TODO: add local-storage call to save local high score

    startGame() {
        this.questionIndex = 0;
        this.questions$.next( LVL_1 );
        this.currentQuestion$.next( LVL_1[this.questionIndex] );
        this.state$.next(GameState.PLAYING);
    }

    endGame() {
        this.state$.next(GameState.COMPLETE);
    }

    scoreQuestion(answer) {
        const q = this.currentQuestion$.value;
        const isCorrect = q.answer.toString() == answer;

        if ( isCorrect ) {
            this.streakService.addStreak();
            this.score$.next(this.score$.value + q.points)
            this.correctCount$.next(this.correctCount$.value + 1);
        } else {
            this.streakService.clearStreak();
        }
        this.questionIndex++;
        if ( this.questions$.value.length > this.questionIndex ) {
            this.currentQuestion$.next(
                this.questions$.value[this.questionIndex]
            );
        } else {
            this.endGame();
        }
    }
}

export const GameState = {
    TITLE: 'TITLE',
    LEVEL_SELECT: 'LEVEL_SELECT',
    PLAYING: 'PLAYING',
    COMPLETE: 'GAME_COMPLETE',
}

