import React, { Component } from 'react';
import { gameService, streakService } from '../../../services'


export default class Streak extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            iterator: []
        }        
    }

    componentDidMount() {
        let observable;
        if (this.props.current) {
            observable = streakService.current$;
        } else if (this.props.max) {
            observable = streakService.max$;
        }

        observable.subscribe(streak => {
            this.setState({
                iterator: emptyArrayOf(streak)
            })
        })
    }

    render() {
        return this.state.iterator.map(s => (
            <div key={'steak-'+s} className={
                "animate__animated animate__infinite animate__tada d-inline "+
                "bi-fire text-light-red" + this.props.className || ""
            }></div>
        ));
    }
}

const emptyArrayOf = (length) => {
    let array = [];
    for(let i=0; i<length; i++) {
        array.push(i);
    }
    return array;
}