
export class LocalStorageService {

    HIGH_SCORE_COUNT = 10;


    saveHighScore(newScore) {
        let data = window.localStorage.getItem('highScore');
        let highScores = [ ]
        if ( data ) {
            highScores = JSON.parse(data);
        } 
        highScores.push(newScore);
        highScores = highScores
            .sort((a, b) => b - a)
            .slice();
    }

}