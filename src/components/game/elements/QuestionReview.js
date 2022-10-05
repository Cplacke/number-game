
export const QuestionReview = ({ question }) => (
    <p className={'mt-2 mb-0 '+(question.isCorrect ? 'text-light-green' : 'text-light-red') }>
        { question.prompt } = { question.answer }
        <span className='d-block m-0'>
            { !question.isCorrect && 'your response: '+question.answered }
        </span>
    </p>
);