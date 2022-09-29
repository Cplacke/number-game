const fs = require('fs');
const {generateQuestions} = require('generate-questions')

fs.mkdirSync('./level-1/', { recursive: true });
fs.mkdirSync('./level-2/', { recursive: true });
fs.mkdirSync('./level-3/', { recursive: true });
fs.mkdirSync('./level-4/', { recursive: true });

let operands;
let level;
const timestamp = new Date().toISOString();
//level 1 (one operand)
operands = [ '+', '-' ];
level = generateQuestions(operands, 6, 2, { time: 6*1000, points: 500 });
console.log('LEVEL 1', level);
fs.writeFileSync(
    // `./level-1/q-${timestamp}.json`,
    `./level-1/questions-2.json`,
    JSON.stringify(level, null, 2),
    { encoding: 'utf8' }
);
// level 2 (one operand)
operands = [ '+', '-', '*' ];
level = generateQuestions(operands, 6, 2, { time: 7.5*1000, points: 700 });
console.log('LEVEL 2', level);
fs.writeFileSync(
    // `./level-2/q-${timestamp}.json`,
    `./level-2/questions-2.json`,
    JSON.stringify(level, null, 2),
    { encoding: 'utf8' }
);
// level 3 (two operand)
operands = [ '+', '-' ];
level = generateQuestions(operands, 6, 3, { time: 10*1000, points: 1000 });
console.log('LEVEL 3', level);
fs.writeFileSync(
    // `./level-3/q-${timestamp}.json`,
    `./level-3/questions-2.json`,
    JSON.stringify(level, null, 2),
    { encoding: 'utf8' }
);
// level 4 (two operand)
operands = [ '+', '-', '*' ];
level = generateQuestions(operands, 6, 3, { time: 12*1000, points: 1400 });
console.log('LEVEL 4', level);
fs.writeFileSync(
    // `./level-4/q-${timestamp}.json`,
    `./level-4/questions-2.json`,
    JSON.stringify(level, null, 2),
    { encoding: 'utf8' }
);