export const generateLevel = (level) => {
    if (!level) {
        throw new Error('No level specified')
    }
    let operands;
    switch (level) {
        case 1: 
            operands = [ '+', '-' ];
            return generateQuestions(operands, 6, 2, { time: 6*1000, points: 500 });
        case 2: 
            operands = [ '+', '-', '*' ];
            return generateQuestions(operands, 6, 2, { time: 7.5*1000, points: 700 });
        case 3: 
            operands = [ '+', '-' ];
            return generateQuestions(operands, 6, 3, { time: 10*1000, points: 1000 });
        case 4: 
            operands = [ '+', '-', '*' ];
            return generateQuestions(operands, 6, 3, { time: 12*1000, points: 1400 });
        case 5: 
            operands = [ '-', '*' ];
            return generateQuestions(operands, 6, 3, { time: 12*1000, points: 3000 });
    }
}

export const generateQuestions = (operands, count, terms=2, append) => {
    let qs = [];
    for(let i=0; i < count; i++) {
        const prompt = getPrompt(terms, operands);
        const answer = eval(prompt);
        qs.push({
            prompt,
            answer,
            ...append
        })
    }
    return qs;
}

const getPrompt = (terms, operands) => {
    let prompt = '';
    for(let i=0; i < terms; i++) {
        let t = getRandInt(1, 20)
        prompt += `${t}${i+1 < terms ? ' '+operands[getRandInt(0, operands.length)]+' ' : ''}`;
    }
    return prompt;
}

const getRandInt = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}