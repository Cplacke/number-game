
export class LocalStorageService {

    HIGH_SCORE_COUNT = 5;

    addHighScore(newScore) {
        let highScores = this.getHighScoreData();
        highScores.push(newScore);
        highScores = highScores
            .sort((a, b) => b - a)
            .slice(0, this.HIGH_SCORE_COUNT); // only keep X highScores
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