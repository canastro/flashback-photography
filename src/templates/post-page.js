// @flow
import React from 'react';
import {connect} from 'react-redux';
import {Helmet} from 'react-helmet';

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
  props: Props;

  /**
   * @method handleSwipe
   * @param {Object} event - swipe event
   */
  handleSwipe = (event) => {
      const direction = event.direction > 2 ? 'prev' : 'next';

      const {posts} = this.props;
      const id = this.props.location.pathname.split('/post/')[1];
      const currentPostId = id.endsWith('/') ? id.slice(0, -1) : id;

      this.props.navigate(posts, currentPostId, direction);
  };

  /**
   * @method render
   * @returns {Node} react node
   */
  render() {
      const {allContentfulPost} = this.props.data;
      const post = allContentfulPost.edges[0].node;
      const {description, photo, photographer} = post;

      // const location = typeof window !== 'undefined' && window && window.location;
      // <meta property="og:url" content={location.href} />

      return [
          <Helmet key="helmet">
              <meta property="og:url" content="https://flashback.netlify.com" />
              <meta property="og:type" content="article" />
              <meta property="og:title" content={`Photo by ${photographer.name}`} />
              <meta property="og:description" content={description} />
              <meta property="og:image" content={`https:${photo.sizes.src}`} />
          </Helmet>,
          <ShowPost key="showPost" post={allContentfulPost} onSwipe={this.handleSwipe} />
      ];
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
    allContentfulPost(filter: { id: { eq: $id } }) {
      edges {
        node {
          ...PostDetail_details
        }
      }
    }
  }
`;
