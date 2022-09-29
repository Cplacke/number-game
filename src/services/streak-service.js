import { BehaviorSubject } from "rxjs";


export class StreakService {

    current$ = new BehaviorSubject(0);
    max$ = new BehaviorSubject(0);

    addStreak = () => {
        const newStreak = this.current$.value + 1;
        this.current$.next( newStreak );
        if ( newStreak > this.max$.value) {
            this.max$.next(newStreak);
        }
        console.info({ new: newStreak, max: this.max$.value });
    }

    clearStreak = () => {
        this.current$.next( 0 );
    }

    resetStreak = () => {
        this.clearStreak();
        this.max$.next(0);
    }
}