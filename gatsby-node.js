const _ = require('lodash');
const Promise = require('bluebird');
const path = require('path');
const slug = require('slug');
const slash = require('slash');

exports.createPages = ({graphql, boundActionCreators}) => {
    const {createPage} = boundActionCreators;

    /**
     * Create all the post images
     * @method  buildPostPages
     * @returns {Promise} All the posts pages were created
     */
    const buildPostPages = () =>
        graphql(`
            {
                allContentfulPost {
                    edges {
                        node {
                            id
                        }
                    }
                }
            }
        `).then((result) => {
            if (result.errors) {
                throw new Error(result.errors);
            }

            const postTemplate = path.resolve('src/templates/post-page.js');
            _.each(result.data.allContentfulPost.edges, (edge) => {
                createPage({
                    path: `/${slug(edge.node.id)}/`,
                    component: slash(postTemplate),
                    context: {
                        id: edge.node.id
                    }
                });
            });
        });

    /**
     * Create all the tag pages
     * @method  buildTagPages
     * @returns {Promise} All the tags pages were created
     */
    const buildTagPages = () =>
        graphql(`
            {
                allContentfulTag {
                    edges {
                        node {
                            id
                            name
                        }
                    }
                }
            }
        `).then((result) => {
            if (result.errors) {
                throw new Error(result.errors);
            }

            const tagTemplate = path.resolve('src/templates/tag-page.js');
            _.each(result.data.allContentfulTag.edges, (edge) => {
                createPage({
                    path: `/tag/${slug(edge.node.name)}/`,
                    component: slash(tagTemplate),
                    context: {
                        id: edge.node.id
                    }
                });
            });
        });

    /**
     * Create all the album pages
     * @method  buildAlbumPages
     * @returns {Promise} All the tags pages were created
     */
    const buildAlbumPages = () =>
        graphql(`
            {
                allContentfulAlbum {
                    edges {
                        node {
                            id
                            name
                        }
                    }
                }
            }
        `).then((result) => {
            if (result.errors) {
                throw new Error(result.errors);
            }

            const albumTemplate = path.resolve('src/templates/album-page.js');
            _.each(result.data.allContentfulAlbum.edges, (edge) => {
                createPage({
                    path: `/album/${slug(edge.node.name)}/`,
                    component: slash(albumTemplate),
                    context: {
                        id: edge.node.id
                    }
                });
            });
        });

    return Promise.all([buildPostPages(), buildTagPages(), buildAlbumPages()]);
};
