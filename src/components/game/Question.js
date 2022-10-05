import React, { Component } from 'react';
import { Countdown, NumericKeyboard } from './elements/index'
import { gameService } from '../../services'

export default class Question extends Component {

    constructor(props) {
        super(props);
        this.state = {
            questionNumber: -1,
            currentQuestion: null
        }
    }

    componentDidMount() {
        gameService.currentQuestion$.subscribe((currentQuestion) => {
            this.setState({
                questionNumber: gameService.questionIndex,
                currentQuestion
            });
        });
    }

    render() {
        return this.state.currentQuestion && (
            <div className='question text-space'>   
                <h3 className='m-0 px-1'>
                    Question { this.state.questionNumber+1 }
                    <span className='text-pink fs-6 font-monospace px-1'>
                        ~ solve
                    </span>
                </h3>
                <p className='question-content'> 
                    { this.state.currentQuestion.prompt }
                </p>
                <Countdown 
                    question={this.state.currentQuestion}
                    onTimeUp={this.props.onAnswered}
                />
                <NumericKeyboard 
                    onSubmit={this.props.onAnswered}
                />
            </div>
        );
    }
}