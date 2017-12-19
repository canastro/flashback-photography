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
class TagPage extends React.Component {
  props: Props;

  /**
   * Dispatches the action to update the current posts
   * @param {Object} props - react props
   */
  constructor(props) {
      super(props);

      const {post} = this.props.data.allContentfulTag.edges[0].node;

      this.props.setPosts(post);
  }

  /**
   * Renders the list posts and passes down the action to update the visible posts
   * @method render
   * @returns {Node} react node
   */
  render() {
      const {name, post} = this.props.data.allContentfulTag.edges[0].node;

      return (
          <div>
              <h1>Tags: {name}</h1>
              <ListPosts
                  posts={post}
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

export default connect(mapStateToProps, {setPosts, updateVisiblePosts})(TagPage);

export const pageQuery = graphql`
  query TagPage($id: String!) {
    allContentfulTag(filter: { id: { eq: $id } }) {
      edges {
        node {
          id
          name
          post {
            id
            ...Post_details
          }
        }
      }
    }
  }
`;
