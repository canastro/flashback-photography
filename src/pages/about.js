// @flow
import React from 'react';
import injectSheet from 'react-jss';
import {rhythm} from '../utils/typography';

const styles = {
    root: {
        padding: rhythm(3 / 4)
    },
    mySelfWrapper: {
        display: 'flex'
    },
    mySelf: {
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
    const {mySelf, general, photo} = data.allContentfulAbout.edges[0].node;

    return (
        <div className={classes.root}>
            <h1>About Me</h1>
            <div className={classes.mySelfWrapper}>
                <img
                    alt="Post"
                    key={photo.responsiveResolution.src}
                    src={photo.responsiveResolution.src}
                    srcSet={photo.responsiveResolution.srcSet}
                    className={classes.image}
                />
                <div
                    className={classes.mySelf}
                    dangerouslySetInnerHTML={{__html: mySelf.childMarkdownRemark.html}}
                />
            </div>
            <div dangerouslySetInnerHTML={{__html: general.childMarkdownRemark.html}} />
        </div>
    );
};

export default injectSheet(styles)(About);

export const pageQuery = graphql`
    query aboutPage {
        allContentfulAbout {
            edges {
                node {
                    id
                    mySelf {
                        childMarkdownRemark {
                            html
                        }
                    }
                    general {
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
    }
`;
