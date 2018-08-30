import {createStore} from 'redux';

import reducer from './ducks/reducer.js';

const store = createStore(reducer);

export default store;