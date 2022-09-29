import { Subscription, timer } from "rxjs";


export class CountdownService {
    countdown$;
    ticks$;

    subscription = new Subscription();

    setTimer(ms) {
        this.subscription.unsubscribe();
        this.countdown$ = timer(ms);
        this.ticks$ = timer(ms, 1);
    }
}