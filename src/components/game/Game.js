import React, { Component } from 'react';
import { Subscription, combineLatest } from 'rxjs';
import Question from './Question';
import { Streak, GameButton, QuestionReview } from './elements/index';
// import level4 from '../../question-lib/level-4/questions-eliza.json';
// import { LVL_1 } from '../../question-lib';
// import {generateQuestions} from '../../question-lib/generate-questions';
import confetti from '../../assets/svg/confetti.svg'
import { gameService } from '../../services'
import { GameState } from '../../services/game-service'

export default class Game extends Component {
    
    subscriptions = new Subscription();
    constructor(props) {
        super(props);
        this.state = { 
            state: null,
            correctCount: 0,
            index: 0,
            score: 0,
            streak: {
                count: 0,
                max: 0
            }
        }
    } 

    componentDidMount() {
        this.subscriptions.add(
            combineLatest([
                gameService.state$,
                gameService.score$,
                gameService.correctCount$
            ]).subscribe(([state, score, correctCount]) => {
                console.info({ initState: state});
                this.setState({
                    state,
                    score,
                    correctCount
                })
            })
        )
    }

    scoreQuestionAnswer = (answer) => {
        gameService.scoreQuestion(answer);
    }

    renderGameState() {
        if (this.state.state === GameState.TITLE) {
            return (
                <div style={{ display: 'flex', minHeight: '80vh', maxWidth: '40vw', margin: 'auto', alignItems: 'center', justifyContent: 'center'}}>
                    <GameButton text="Play" onClick={() => gameService.levelSelect()} />
                </div>
            )
        } else if (this.state.state === GameState.LEVEL_SELECT) {
            return (
                <div >
                    <GameButton text="LVL 1" onClick={() => gameService.startGame(1)} />
                    <GameButton text="LVL 2" onClick={() => gameService.startGame(2)} />
                    <GameButton text="LVL 3" onClick={() => gameService.startGame(3)} />
                    <GameButton text="LVL 4" onClick={() => gameService.startGame(4)} />
                    <GameButton text="INSANE MODE" onClick={() => gameService.startGame(5)} />
                </div>
            )
        } else if (this.state.state === GameState.PLAYING) {
            return (
                <div>
                    <span className="float-end font-monospace text-light-pink">
                        { this.state.score }
                    </span>   
                    <div className="float-end me-1">
                        <Streak current />
                    </div>
                    <Question 
                        onAnswered={this.scoreQuestionAnswer}
                    />
                </div>
            )
        } else if (this.state.state === GameState.COMPLETE) {
            return (
                <div className="m-auto font-monospace" style={{ minHeight: '80vh' }}>
                    <img className="celebration" src={confetti} />
                    <h1 className="mt-5 text-center text-light-pink">High Score</h1>
                    <h2 className="text-center high-score text-pink">
                        { this.state.score }
                    </h2>
                    <h3 className="text-center mt-4 high-score  text-pink">
                        { this.state.correctCount } of { gameService.questions$.value.length } correct
                    </h3>
                    <div className="text-center fs-3">
                        <Streak max className="text-center"/>
                        {
                            gameService.questions$.value.map((question, i) => ( 
                                <QuestionReview id={"review-q-"+i} question={question}/>
                            ))
                        }
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="game-container">
                <div className='bg-dark-blue rounded-3 py-2 px-1'>
                    { this.renderGameState() }
                </div>
            </div>
        );
    }
}