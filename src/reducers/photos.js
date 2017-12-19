const defaultState = {
    visible: 12,
    posts: []
};

export default (state = defaultState, action) => {
    switch (action.type) {
    case 'UPDATE_VISIBLE_POSTS':
        return {...state, visible: action.payload};
    case 'UPDATE_POSTS':
        return {...state, posts: action.payload};
    default:
        return state;
    }
};
