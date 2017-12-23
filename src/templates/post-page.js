// @flow
import React from 'react';
import {connect} from 'react-redux';

import ShowPost from '../components/post/show/show';
import {navigate} from '../actions/posts';

type Props = {
    data: Object,
    posts: Array<Object>,
    navigate: Function,
    location: Object
};

/**
 * Post Page
 * @method PostTemplate
 */
class PostPage extends React.Component {
    props: Props

    /**
     * @method handleSwipe
     * @param {Object} event - swipe event
     */
    handleSwipe = (event) => {
        const direction = event.direction > 2 ? 'prev' : 'next';

        const {posts} = this.props;
        const id = this.props.location.pathname.split('/post/')[1];
        const currentPostId = id.endsWith('/') ? id.slice(0, -1) : id;

        this.props.navigate(
            posts,
            currentPostId,
            direction
        );
    };

    /**
     * @method render
     * @returns {Node} react node
     */
    render() {
        const {allContentfulPost} = this.props.data;

        return <ShowPost post={allContentfulPost} onSwipe={this.handleSwipe} />;
    }
}

/**
 * Maps the state
 * @param {Object} state - redux store
 * @returns {Object} mapped state
 */
const mapStateToProps = (state: Object) => ({posts: state.photos.posts});

export default connect(mapStateToProps, {navigate})(PostPage);

export const pageQuery = graphql`
    query PostPage($id: String!) {
        allContentfulPost(filter: {id: {eq: $id}}) {
            edges {
                node {
                    ...PostDetail_details
                }
            }
        }
    }
`;
