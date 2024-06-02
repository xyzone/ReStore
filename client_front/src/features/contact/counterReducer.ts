export const INCREMENT = "INCREMENT_COUNTER";
export const DECREMENT = "DECREMENT_COUNTER";

export interface CounterState{
    data: number;
    title: string;
}

const initialState: CounterState = {
    data: 42,
    title: 'YYYCCC',
}

export function increment(amount = 1){
    return {
        type: INCREMENT,
        payload: amount
    }
}
export function decrement(amount = 1){
    return {
        type: DECREMENT,
        payload: amount
    }
}

interface CounterAction{
    type: string,
    payload: number
}

export default function counterReducer(state = initialState, action: CounterAction){
    switch(action.type){
        case INCREMENT:
            return{
                ...state, data: state.data + action.payload
            };
        case DECREMENT:
            return{
                ...state, data: state.data - action.payload
            };
        default: return state;
    } 
}