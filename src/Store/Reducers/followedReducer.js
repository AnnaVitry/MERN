let initialState = { followed: [], id: ''};

function toggleFollowed(state = initialState, action) {
    switch(action.type) {
        case 'TOGGLE_FOLLOWED':
            if (action.value.id) {
                const followedIndex = state.followed.findIndex(item => item === action.value.id);
                if (followedIndex !== -1) {
                    state.followed.splice(followedIndex,1);
                }
                else  {
                    state.followed.push(action.value.id);
                }
                return state;
            } else {
                return action.value;
            }
        default:
            return state;
    } 
}
export default toggleFollowed;