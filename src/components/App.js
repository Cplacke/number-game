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
                    <h1 className='text-teal mb-0'> Mathel </h1>
                </div>
                <Game/>
            </div>
        );
    }
}