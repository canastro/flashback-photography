// @flow
import React from 'react';
import {connect} from 'react-redux';

import {setPosts, updateVisiblePosts} from '../actions/posts';
import ListPosts from '../components/post/list/list';

type Props = {
  data: Object,
  setPosts: Function,
  updateVisiblePosts: Function,
  visible: number
};

/**
 * Index page
 * @method
 * @param   {Object} props - react props
 * @returns {Node} react node
 */
class Pages extends React.Component {
  props: Props;

  /**
   * Dispatches the action to update the current posts
   */
  componentDidMount() {
      const posts = this.props.data.allContentfulPost.edges.map(e => e.node);

      this.props.setPosts(posts);
  }

  /**
   * Renders the list posts and passes down the action to update the visible posts
   * @method render
   * @returns {Node} react node
   */
  render() {
      const posts = this.props.data.allContentfulPost.edges.map(e => e.node);

      return (
          <ListPosts
              posts={posts}
              visiblePosts={this.props.visible}
              onVisiblePostsChange={this.props.updateVisiblePosts}
          />
      );
  }
}

/**
 * Maps the state
 * @param {Object} state - redux store
 * @returns {Object} mapped state
 */
const mapStateToProps = (state: Object) => ({visible: state.photos.visible});

export default connect(mapStateToProps, {setPosts, updateVisiblePosts})(Pages);

export const pageQuery = graphql`
  query allImages {
    allContentfulPost(filter: { showOnMainPage: { eq: true } }) {
      edges {
        node {
          id
          description
          ...Post_details
          ...PostDetail_details
          ...Modal_posts
        }
      }
    }
  }
`;
