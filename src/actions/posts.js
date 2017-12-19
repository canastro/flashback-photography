// @flow

/**
 * Updates the number of visible posts
 * @method updateVisiblePosts
 * @param {Number} value - number of visible posts
 * @returns {Function} redux thunk
 */
export const updateVisiblePosts = (value: number): Function => dispatch => dispatch({
    type: 'UPDATE_VISIBLE_POSTS',
    payload: value
});

/**
 * Sets the current posts
 * @param {Array} posts - current posts
 * @returns {Function} redux thunk
 */
export const setPosts = (posts: ?Array<Object>): Function => dispatch => dispatch({
    type: 'UPDATE_POSTS',
    payload: posts
});
