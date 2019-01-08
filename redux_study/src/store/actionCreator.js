import { bindActionCreators } from 'redux';
import * as counterActions from './modules/counter';

import store from './index';

const { dispatch } = store;

export const CounterActions = bindActionCreators(counterActions, dispatch);
