import { createStore } from 'redux';

//REDUCER
const reducer = function(state, action) {
   return "unknown";
}

//store
const store = createStore(reducer, 0);

store.subscribe(() => {
    console.log('store changed', store.getState);
})

store.dispatch({type: "INC", })