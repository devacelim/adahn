import React, { Component } from 'react';
import CounterContainer from '../containers/CounterContainer';
import SubscribeTest from '../containers/SubscribeTest'
import './App.css';

import Todos from './Todos'


class App extends Component {
    render() {
        return (
             <div className="app-template">
                  <div className="counter">{<CounterContainer/>}</div>
                 <div className="todos">{<SubscribeTest/>}</div>
            </div>
        );
    }
}

export default App;