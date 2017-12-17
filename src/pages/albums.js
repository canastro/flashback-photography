// @flow
import React from 'react';
import Preview from '../components/album/preview/preview';

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
    const albums = props.data.allContentfulAlbum.edges.map(album => album.node);

    return (
        <div>
            {albums.map(album => <Preview key={album.id} album={album} />)}
        </div>
    );
};

export default AlbumPage;

export const pageQuery = graphql`
    query AlbumsPage {
        allContentfulAlbum {
            edges {
                node {
                    id
                    name
                    cover {
                        responsiveResolution(width: 200) {
                            width
                            height
                            src
                            srcSet
                        }
                    }
                }
            }
        }
    }
`;
