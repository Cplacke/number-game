
export class LocalStorageService {

    HIGH_SCORE_COUNT = 10;

    addHighScore(newScore) {
        let highScores = this.getHighScoreData();
        highScores.push(newScore);
        highScores = highScores
            .sort((a, b) => b - a)
            .slice(0, 5); // only keep 10 high scores
        this.setHighScoreData(highScores);
    }

    getHighScoreData() {
        let data = window.localStorage.getItem('highScore');
        let highScores = [ ];
        if ( data ) {
            highScores = JSON.parse(data);
        } 
        return highScores;
    }

    setHighScoreData(data) {
        window.localStorage.setItem(
            'highScore',
            JSON.stringify(data)
        );
    }

}