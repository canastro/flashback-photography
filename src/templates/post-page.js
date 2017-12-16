// @flow
import React from 'react';
import PostDetail from '../components/post/show/show';

type Props = {
    data: Object
};

/**
 * Post Page
 * @method TagTemplate
 * @param  {Object} props - page props
 * @returns {Node} page
 */
const PostPage = (props: Props) => {
    const {allContentfulPost} = props.data;

    return <PostDetail post={allContentfulPost} />;
};

export default PostPage;

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
