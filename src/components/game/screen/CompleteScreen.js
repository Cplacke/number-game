import React, { Component } from 'react';
import { gameService } from '../../../services'
import { Streak, QuestionReview, GameButton } from '../elements/index';
import confetti from '../../../assets/svg/confetti.svg'


export class CompleteScreen extends Component {

    currentScore = null;
    pastHighScores = [];
    newHighScore = false;
    constructor(props) {
        super(props);
        this.currentScore = gameService.score$.value;
        this.pastHighScores = gameService.localStorageService.getHighScoreData();
        this.newHighScore = this.currentScore >= this.pastHighScores[0];
    }

    playAgain = (level) => {
        gameService.startGame(level);
    }

    render() {
        return (
            <div className="m-auto font-monospace" style={{ minHeight: '80vh' }}>
                <img className="celebration" src={confetti} alt="celebration-gif" />
                <div className="fs-1 mt-5 mb-2 text-center text-light-pink">
                    { this.newHighScore && 'New High' } Score
                </div>
                <div className="fs-2 mb-2 text-center high-score text-pink">
                    { this.currentScore }
                </div>
                <div className="text-center mt-2 mb-2 high-score text-pink">
                    { gameService.correctCount$.value } of { gameService.questions$.value.length } correct
                </div>

                <GameButton text="Play Again" colorClass="bg-pirkle m-3" onClick={() => this.playAgain(gameService.level)} />

                <div className="text-center fs-3">
                    <Streak max className="text-center"/>
                    <div className="my-2">
                        {
                            gameService.questions$.value.map((question, i) => ( 
                                <QuestionReview id={"review-q-"+i} question={question}/>
                            ))
                        }
                    </div>
                    <div className="fs-6 text-light-purple">
                        <div>Past Scores:</div>
                        { 
                            this.pastHighScores.map((s, i) => (
                                <span id={`score-${i}`} className="me-2">
                                    { s }
                                </span>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }

}