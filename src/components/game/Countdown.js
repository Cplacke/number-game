import React, { Component } from 'react';
import { countdownService } from '../../services'
import { of, tap, timer, Subscription } from 'rxjs'

export default class Countdown extends Component {

    timerSubscription = new Subscription();;

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.setDuration();
    }

    componentDidUpdate(prevProps, newProps) {
        document.querySelector('.timer-bar').style.animation = ''
        this.setDuration();
    }

    setDuration() {
        const ms = this.props.question.time; 
        // countdownService.setTimer(ms);
        // this.timerSubscription.unsubscribe();
        // this.timerSubscription = countdownService.countdown$.subscribe(() => {
        //     console.info('timers out...');
        //     this.props.onTimeUp();
        // })

        // reset css animation
        setTimeout(() => {
            document.querySelector('.timer-bar').style.animation = 'countdown linear';
            document.querySelector('.timer-bar').style.animationDuration = ms/1000 +'s';
        }, 15)
    }

    render() {
        return (
            <div className='timer-container mb-1'>                
                <div className='timer-bar rounded-3 transition-background fast' ref={this.timerRef}></div>
            </div>
        );
    }
}