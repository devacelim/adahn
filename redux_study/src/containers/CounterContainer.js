import React, { Component } from 'react';
import Counter from '../components/Counter';
import {connect} from 'react-redux';

import {CounterActions} from "../store/actionCreator";

class CounterContainer extends Component {
  handleIncrement() {
    CounterActions.increment();
  }

  handleDecrement() {
    CounterActions.decrement();
  }

  render() {
    const { handleIncrement, handleDecrement } = this;
    const { number } = this.props;

    return (
      <Counter
        onIncrement={handleIncrement.bind(this)}
        onDecrement={handleDecrement.bind(this)}
        number={number}
      />
    );
  }
}


export default connect(
    ({counter}) => ({
        number : counter.get('number')
    })


)(CounterContainer)