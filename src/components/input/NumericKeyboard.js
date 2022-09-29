import React, { Component } from 'react';

export default class NumericKeyboard extends Component {

    constructor(props) {
        super(props);
        this.state = { value: '' }
        this.registerKeyboardInput();
    }

    submit = () => {
        this.props.onSubmit(this.state.value);
        this.setState({ value: '' })
    }

    keyPress = (key) => {
        if (key.negate) {
            let flipped = '-';
            if (this.state.value) {
                flipped = Number(this.state.value) * -1;
            }
            this.setState({
                value: flipped.toString()
            });
        } else if (key.clear) {
            this.setState({
                value: ''
            });
        } else if (key.submit) {
            this.submit();
            return;
        } else {
            this.setState({ 
                value: this.state.value + key.text
            });
        }
        if (this.props.onChange) {
            this.props.onChange(this.state.value);
        }
    }

    render() {
        return (
            <div>
                <div className="number-input-line text-center bg-space text-purple font-monospace fs-2 p-2 rounded-1">
                    { this.state.value }
                    { 
                        this.state.value && 
                        <div className="fas fa-backspace text-light-red
                            float-end animate__animated animate__faster animate__lightSpeedInRight"
                            onClick={() => this.keyPress({ clear: true })}
                        ></div> 
                    }
                </div>
                <div className="d-flex justify-content-center">
                    <div className="keyboard w-100">
                        <div className="w-100">
                            <div className="d-flex">
                                { this.renderInputButton({ text: '1', className: 'keyboard-button' }) }
                                { this.renderInputButton({ text: '2', className: 'keyboard-button' }) }
                                { this.renderInputButton({ text: '3', className: 'keyboard-button' }) }
                            </div>
                            <div className="d-flex">
                                { this.renderInputButton({ text: '4', className: 'keyboard-button' }) }
                                { this.renderInputButton({ text: '5', className: 'keyboard-button' }) }
                                { this.renderInputButton({ text: '6', className: 'keyboard-button' }) }
                            </div>
                            <div className="d-flex">
                                { this.renderInputButton({ text: '7', className: 'keyboard-button' }) }
                                { this.renderInputButton({ text: '8', className: 'keyboard-button' }) }
                                { this.renderInputButton({ text: '9', className: 'keyboard-button' }) }
                            </div>
                            <div className="d-flex">
                                {[ 
                                    this.renderInputButton({ 
                                        negate: true,
                                        text: (
                                            Number(this.state.value) < 0 ? '+' : '-'
                                        ), 
                                        className: 'keyboard-button' //green-button' 
                                    }),
                                    this.renderInputButton({ text: '0', style: { flexGrow: 2 }, className: 'keyboard-button'}) 
                                ]}
                            </div>
                        </div>
                        { this.renderInputButton({ submit: true, className: 'green-button me-0 fas fa-arrow-circle-up fs-2 p-4' }) }
                    </div>
                </div>
            </div>
        );
    }

    renderInputButton = (options = { text: 'X', value: 0, size: null, className: '' }) => {
        return (
            <div className={"text-navy rounded-1 me-1 mt-1 "+options.className} 
                onClick={(e) => this.keyPress(options)}
                style={{...options.style}}
            >{ options.text }</div>
        )
    }

    registerKeyboardInput = () => {
        const processKey = (e) => {
            if (e.key === 'Backspace') {
                e.clear = true;
            }
            if (e.key === 'Enter' && this.state.value) {
                this.submit();
                e.stopPropagation();
                return;
            }
            if (e.key === '-' || e.key === '=') {
                e.negate = true;
            }
            e.text = e.key;
            this.keyPress(e);
        };
        document.addEventListener('keyup', processKey); 
    }
}