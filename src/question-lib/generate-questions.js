const generateQuestions = (operands, count, terms=2, append) => {
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

export default generateQuestions;