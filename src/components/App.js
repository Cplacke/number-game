import React, { Component } from 'react';
import Game from './game/Game';
import logo from '../logo.svg';

export default class App extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div className='app-container'>
                <div className='game-container'>
                    <img className='logo' src={logo} />
                    <h1 className='text-teal mb-0'>
                        Mathel
                        <a href="https://github.com/Cplacke/number-game" className="text-dark float-end text-decoration-none">
                            <i className='ms-2 icon4 fab fa-github'></i>
                        </a>
                    </h1>
                    
                </div>
                <Game/>
            </div>
        );
    }
}