import { GameService } from './game-service';
import { CountdownService } from './countdown-service';
import { StreakService } from './streak-service';

const streakService = new StreakService();
const gameService = new GameService(streakService);
const countdownService = new CountdownService();

export {
    streakService,
    gameService,
    countdownService
}