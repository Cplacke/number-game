import { Subscription, timer, interval } from "rxjs";


export class CountdownService {
    countdown$;
    ticks$;

    subscription = new Subscription();

    setTimer(ms) {
        this.subscription.unsubscribe();
        this.countdown$ = timer(ms);
        this.ticks$ = interval(100); // every 100 ms, 1/10 sec
    }
}