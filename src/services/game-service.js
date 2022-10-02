import { BehaviorSubject, take } from "rxjs";
import { generateLevel } from '../question-lib/generate-questions';
import { LocalStorageService } from './local-storage-service';

export class GameService {
    streakService;
    countdownService;
    localStorageService;
    constructor(streakService, countdownService) {
        this.streakService = streakService;
        this.countdownService = countdownService;
        this.localStorageService = new LocalStorageService();
    }

    state$ = new BehaviorSubject(GameState.TITLE);
    score$ = new BehaviorSubject(0);
    correctCount$ = new BehaviorSubject(0);
    
    questions$ = new BehaviorSubject([]);
    questionIndex = 0;
    currentQuestion$ = new BehaviorSubject(1);

    counterSubscription;
    // TODO: add local-storage call to save local high score

    levelSelect() {
        this.state$.next(GameState.LEVEL_SELECT);
    }

    startGame(level) {
        this.questionIndex = 0;
        const questions = generateLevel(level);
        this.questions$.next( questions );
        this.currentQuestion$.next( questions[this.questionIndex] );
        this.state$.next(GameState.PLAYING);
        this.resetCountdownClock(); // start clock
    }

    endGame() {
        this.countdownSubscription.unsubscribe();
        this.ticksSubscription.unsubscribe();
        this.state$.next(GameState.COMPLETE);
        this.localStorageService.addHighScore(
            this.score$.value
        );
    }

    scoreQuestion(answer) {
        const q = this.currentQuestion$.value;
        const isCorrect = q.answer.toString() == answer;

        if ( isCorrect ) {
            this.streakService.addStreak();
            this.score$.next(
                this.score$.value + this.getPointsForAnswer(q)
            );
            this.correctCount$.next(this.correctCount$.value + 1);
        } else {
            this.streakService.clearStreak();
        }
        // move to next question
        this.questionIndex++;
        if ( this.questions$.value.length > this.questionIndex ) {
            this.currentQuestion$.next(
                this.questions$.value[this.questionIndex]
            );
            this.resetCountdownClock();
        } else {
            this.endGame();
        }
    }

    getPointsForAnswer(question) {
        // const msLeft = question.time - this.msElapsed;
        const percentTimeLeft = 1 - this.msElapsed / question.time;
        return Math.ceil( question.points * percentTimeLeft );
    }

    countdownSubscription;
    ticksSubscription;
    msElapsed = 0;
    resetCountdownClock() {
        if ( this.countdownSubscription ) {
            this.countdownSubscription.unsubscribe();
            this.ticksSubscription.unsubscribe();
        }

        console.info(this.currentQuestion$.value);
        const ms = this.currentQuestion$.value.time;
        this.countdownService.setTimer(ms);
        this.countdownSubscription = this.countdownService.countdown$.subscribe(() => {
            console.info(`TIMES UP: ${ms}ms elapsed`);
            this.scoreQuestion();
        })
        this.ticksSubscription = this.countdownService.ticks$
            .pipe(take( ms / 100 ))
            .subscribe((v) => {
                this.msElapsed = v * 100;
                // console.debug(`ticks: ${v}; ${this.msElapsed}ms elapsed`);
            })
    }
}

export const GameState = {
    TITLE: 'TITLE',
    LEVEL_SELECT: 'LEVEL_SELECT',
    PLAYING: 'PLAYING',
    COMPLETE: 'GAME_COMPLETE',
}

