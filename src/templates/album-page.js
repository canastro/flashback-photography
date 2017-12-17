// @flow
import React from 'react';
import ListPosts from '../components/post/list/list';

type Props = {
    data: Object
};

/**
 * Post Page
 * @method AlbumTemplate
 * @param  {Object} props - page props
 * @returns {Node} page
 */
const AlbumPage = (props: Props) => {
    const {name, posts} = props.data.allContentfulAlbum.edges[0].node;

    return (
        <div>
            <h1>Albums: {name}</h1>
            <ListPosts posts={posts} />
        </div>
    );
};

export default AlbumPage;

export const pageQuery = graphql`
    query AlbumPage($id: String!) {
        allContentfulAlbum(filter: {id: {eq: $id}}) {
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
