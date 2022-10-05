import React, { Component } from 'react';
import { Subscription, combineLatest } from 'rxjs';
import Question from './Question';
import { Streak, GameButton } from './elements/index';
import { CompleteScreen } from './screen/index';
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
                    <GameButton text="LVL 1" colorClass="bg-pirkle" onClick={() => gameService.startGame(1)} />
                    <GameButton text="LVL 2" colorClass="bg-winter-green" onClick={() => gameService.startGame(2)} />
                    <GameButton text="LVL 3" colorClass="bg-winter-green" onClick={() => gameService.startGame(3)} />
                    <GameButton text="LVL 4" colorClass="bg-winter-green" onClick={() => gameService.startGame(4)} />
                    <GameButton text="INSANE MODE" colorClass="bg-rellow" onClick={() => gameService.startGame(5)} />
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
                <CompleteScreen />
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