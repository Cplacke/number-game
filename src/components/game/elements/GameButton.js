
export const GameButton = ({ text, onClick }) => {
    return (
        <div className="play-button transition-background bg-pirkle rounded-5 keyboard-button mx-auto w-75"
            onClick={onClick}
        >
            { text }
        </div>
    )
}