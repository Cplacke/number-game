


export const QuestionReview = ({ question }) => (
    <p className={'mt-2 mb-0 '+(question.isCorrect ? 'text-light-green' : 'text-light-red') }>
        { question.prompt } = { question.answer }
        <p className='m-0'>
            { !question.isCorrect && 'your response: '+question.answered }
        </p>
    </p>
);