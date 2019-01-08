
import {createAction, handleActions} from 'redux-actions';
import { Map } from 'immutable';


const INCREMENT = 'counter/INCREMENT';
const DECREMENT = 'counter/DECREMENT';

const INC1 = 'counter/INC1';
const DEC1 = 'counter/DEC1';

export const increment = createAction(INCREMENT);
export const decrement = createAction(DECREMENT);



export const inc1 = createAction(INC1);
export const dec1 = createAction(DEC1);

const initialState = Map({
    number: 0,
    actNumber: 0
});

export default handleActions({
    [INCREMENT]:(state) => {
        console.log(state)

        return state.update('number',number => number+1)
    },
    [DECREMENT]:(state) =>{
        return state.update('number',number => number-1)
    },
    [INC1]:(state) =>{

        return state.update('number',number => number+2).update('actNumber',actNumber => actNumber+2)
    },
    [DEC1]:(state) =>{
        return state.update('number',number => number-2).update('actNumber',actNumber => actNumber-2)
    }
},initialState)

