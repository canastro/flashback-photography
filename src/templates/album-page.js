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
 * Album page
 * @method
 * @param   {Object} props - react props
 * @returns {Node} react node
 */
class AlbumPage extends React.Component {
  props: Props;

  /**
   * Dispatches the action to update the current posts
   * @param {Object} props - react props
   */
  constructor(props) {
      super(props);

      const {posts} = props.data.allContentfulAlbum.edges[0].node;

      this.props.setPosts(posts);
  }

  /**
   * Renders the list posts and passes down the action to update the visible posts
   * @method render
   * @returns {Node} react node
   */
  render() {
      const {name, posts} = this.props.data.allContentfulAlbum.edges[0].node;

      return (
          <div>
              <h1>Album: {name}</h1>
              <ListPosts
                  posts={posts}
                  visiblePosts={this.props.visible}
                  onVisiblePostsChange={this.props.updateVisiblePosts}
              />
          </div>
      );
  }
}

/**
 * Maps the state
 * @param {Object} state - redux store
 * @returns {Object} mapped state
 */
const mapStateToProps = (state: Object) => ({visible: state.photos.visible});

export default connect(mapStateToProps, {setPosts, updateVisiblePosts})(AlbumPage);

export const pageQuery = graphql`
  query AlbumPage($id: String!) {
    allContentfulAlbum(filter: { id: { eq: $id } }) {
      edges {
        node {
          id
          name
          posts {
            id
            ...Post_details
          }
        }
      }
    }
  }
`;
