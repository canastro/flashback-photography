const _ = require('lodash');
const Promise = require('bluebird');
const path = require('path');
const slug = require('slug');
const slash = require('slash');

// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programmatically
// create pages.
exports.createPages = ({graphql, boundActionCreators}) => {
    const {createPage} = boundActionCreators;

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

    return Promise.all([buildPostPages()]);
};
