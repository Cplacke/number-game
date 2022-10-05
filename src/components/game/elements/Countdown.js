import React, { Component } from 'react';

export class Countdown extends Component {

    componentDidMount() {
        this.setDuration();
    }

    componentDidUpdate(prevProps, newProps) {
        document.querySelector('.timer-bar').style.animation = ''
        this.setDuration();
    }

    setDuration() {
        const ms = this.props.question.time; 
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