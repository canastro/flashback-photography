// @flow
import {navigateTo} from 'gatsby-link';

/**
 * @method next
 * @param {Array<Object>} posts - photo posts
 * @param {Number} currentPostId - selected post id
 * @param {String} direction - next or prev
 * @returns {Function} redux thunk
 */
export const navigate = (posts, currentPostId, direction) => () => {
    const currentIndex = posts.findIndex(post => post.id === currentPostId);

    if (direction === 'next') {
        if (currentIndex + 1 >= posts.length) return;

        navigateTo(`/post/${posts[currentIndex + 1].id}/`);
        return;
    }

    if (currentIndex - 1 < 0) return;

    navigateTo(`/post/${posts[currentIndex - 1].id}/`);
};

/**
 * Updates the number of visible posts
 * @method updateVisiblePosts
 * @param {Number} value - number of visible posts
 * @returns {Function} redux thunk
 */
export const updateVisiblePosts = (value: number): Function => dispatch =>
    dispatch({
        type: 'UPDATE_VISIBLE_POSTS',
        payload: value
    });

/**
 * Sets the current posts
 * @param {Array} posts - current posts
 * @returns {Function} redux thunk
 */
export const setPosts = (posts: ?Array<Object>): Function => dispatch =>
    dispatch({
        type: 'UPDATE_POSTS',
        payload: posts
    });
