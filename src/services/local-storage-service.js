
export class LocalStorageService {

    HIGH_SCORE_COUNT = 10;


    saveHighScore(newScore) {
        let data = window.localStorage.getItem('highScore');
        if ( data ) {
            highScores = JSON.parse(data);
            highScores.push(newScore);
            highScores.sort((a, b) => b - a)
        } else {
            // no high scores yet set; init object storage
        }
    }

}