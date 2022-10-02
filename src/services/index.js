import { GameService } from './game-service';
import { CountdownService } from './countdown-service';
import { StreakService } from './streak-service';

const streakService = new StreakService();
const countdownService = new CountdownService();
const gameService = new GameService(streakService, countdownService);

export {
    streakService,
    gameService,
    countdownService
}