// @flow
import React from 'react';
import injectSheet from 'react-jss';

import {rhythm} from '../utils/typography';
import presets from '../utils/presets';

const styles = {
    root: {
        padding: rhythm(3 / 4)
    },
    photographer: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 20
    },
    photographerWrapper: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        [presets.Tablet]: {
            flexDirection: 'row'
        }
    },
    photographerDescription: {
        display: 'flex',
        alignItems: 'center'
    },
    image: {
        marginRight: 20
    }
};

type Props = {
    classes: Object,
    data: Object
};

/**
 * Create about page based on the about content at contentful
 * @method About
 * @param  {Object} props - react props
 * @returns {Node} html page
 */
const About = (props: Props) => {
    const {classes, data} = props;
    const photographers = data.allContentfulPhotographer.edges.map(edge => edge.node);
    const {general} = data.allContentfulAbout.edges[0].node;

    return (
        <div className={classes.root}>
            <h1>About Us</h1>
            <div dangerouslySetInnerHTML={{__html: general.childMarkdownRemark.html}} />

            {photographers.map(photographer => (
                <div key={photographer.id} className={classes.photographer}>
                    <h2>{photographer.name}</h2>

                    <div className={classes.photographerWrapper}>
                        <img
                            alt="Post"
                            key={photographer.photo.responsiveResolution.src}
                            src={photographer.photo.responsiveResolution.src}
                            srcSet={photographer.photo.responsiveResolution.srcSet}
                            height={photographer.photo.responsiveResolution.height}
                            className={classes.image}
                        />
                        <div
                            className={classes.photographerDescription}
                            dangerouslySetInnerHTML={{
                                __html: photographer.description.childMarkdownRemark.html
                            }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default injectSheet(styles)(About);

export const pageQuery = graphql`
    query aboutPage {
        allContentfulPhotographer {
            edges {
                node {
                    id
                    name
                    description {
                        childMarkdownRemark {
                            html
                        }
                    }
                    photo {
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
        allContentfulAbout {
            edges {
                node {
                    general {
                        childMarkdownRemark {
                            html
                        }
                    }
                }
            }
        }
    }
`;
