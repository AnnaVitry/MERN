const initialState = { logState: true, order: '' }
function toggleLogState(state = initialState, action) {
    let nextState;
    switch(action.type) {
        case 'TOGGLE_LOGSTATE':
            if (action.value.order !== '') {
                if (action.value.logState === false) {
                    nextState = { logState: true };
                } else {
                    nextState = { logState: false };
                }
                return nextState;
            }
            else {
                return action.value;
            }
        default:
            return state;
    } 
}
export default toggleLogState;