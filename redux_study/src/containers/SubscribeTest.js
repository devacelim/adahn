import React, { Component } from 'react';
import {connect} from 'react-redux';

import {CounterActions} from "../store/actionCreator";


class SubscribeTest extends Component {


    onInc1(){


         CounterActions.inc1();
    }

    onDec1(){

         CounterActions.dec1();
    }


  render() {

    const { number ,actNumber} = this.props;

    return (
       <div>
           Test {number}
           Test {actNumber}

            <button onClick={this.onInc1.bind(this)}>증가 (+)</button>
      <button onClick={this.onDec1.bind(this)}>감소 (-)</button>

       </div>
    );
  }
}


export default connect(
   ({counter})  => ({
         number : counter.get('number'),
       actNumber:counter.get('actNumber')
    })

)(SubscribeTest)