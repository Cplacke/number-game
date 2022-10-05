
export const GameButton = ({ text, onClick, colorClass }) => {
    if (!colorClass) {
        colorClass = 'bg-pirkle'
    }
    return (
        <div className={`${colorClass} play-button transition-background rounded-5 keyboard-button mx-auto w-75`}
            onClick={onClick}
        >
            { text }
        </div>
    )
}