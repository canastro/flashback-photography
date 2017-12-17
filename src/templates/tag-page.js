// @flow
import React from 'react';
import ListPosts from '../components/post/list/list';

type Props = {
    data: Object
};

/**
 * Post Page
 * @method TagTemplate
 * @param  {Object} props - page props
 * @returns {Node} page
 */
const TagPage = (props: Props) => {
    const {name, post} = props.data.allContentfulTag.edges[0].node;

    return (
        <div>
            <h1>Tags: {name}</h1>
            <ListPosts posts={post} />
        </div>
    );
};

export default TagPage;

export const pageQuery = graphql`
    query TagPage($id: String!) {
        allContentfulTag(filter: {id: {eq: $id}}) {
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
