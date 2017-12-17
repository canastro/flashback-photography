// @flow

import React from 'react';
import ListPosts from '../components/post/list/list';

type Props = {
    data: Object
};

/**
 * Index page
 * @method
 * @param   {Object} props - react props
 * @returns {Node} react node
 */
export default (props: Props) => {
    const posts = props.data.allContentfulPost.edges.map(e => e.node);

    return <ListPosts posts={posts} />;
};

export const pageQuery = graphql`
    query allImages {
        allContentfulPost(filter: {showOnMainPage: {eq: true}}) {
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
