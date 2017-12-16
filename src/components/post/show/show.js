// @flow
import React from 'react';
import injectSheet from 'react-jss';

import User from './user';
import Settings from './settings';
import styles from './styles';

type Props = {
    classes: Object,
    post: Object
};

/**
 * Post details component
 * @method Show
 * @param  {Object}   props - react props
 * @returns {Node} react node
 */
const Show = (props: Props) => {
    const {classes} = props;
    const post = props.post.edges[0].node;
    const {description, settings, photo, date, tags, photographer} = post;

    /**
     * Post details such as time, description and tags
     * @method PostDetails
     * @returns {Node} react node
     */
    const PostDetails = () => (
        <div className={classes.detailsContainer}>
            <User avatar={photographer.photo} username={photographer.name} date={date} />
            <div className={classes.detailsContent}>
                <p>{description}</p>

                <ul className={classes.listContainer}>
                    {tags.map(tag => (
                        <li className={classes.tag} key={tag.id}>
                            {tag.name}
                        </li>
                    ))}
                </ul>

                <Settings settings={settings} />
            </div>
        </div>
    );

    return (
        <div className={classes.root} onClick={e => e.stopPropagation()}>
            <div className={classes.tabletDetailsContainer}>
                <div className={classes.tabletDetailsWrapper}>
                    <PostDetails />
                </div>
            </div>
            <div className={classes.imageContainer}>
                <div className={classes.imageWrapper}>
                    <img
                        alt="Post"
                        key={photo.responsiveResolution.src}
                        src={photo.responsiveResolution.src}
                        srcSet={photo.responsiveResolution.srcSet}
                        className={classes.image}
                    />
                </div>
            </div>
            <div className={classes.mobileDetailsWrapper}>
                <PostDetails />
            </div>
        </div>
    );
};

export default injectSheet(styles)(Show);

export const postDetailFragment = graphql`
    fragment PostDetail_details on ContentfulPost {
        id
        description
        date(formatString: "DD MMMM, YYYY")
        tags {
            id
            name
        }
        photo {
            responsiveResolution(width: 640) {
                width
                height
                src
                srcSet
            }
        }
        settings {
            machine
            focalLength
            aperture
            exposureTime
            iso
            flash
        }
        photographer {
          name
          photo {
              responsiveResolution(width: 30) {
                  width
                  height
                  src
                  srcSet
              }
          }
        }
    }
`;