// @flow
import React from 'react';
import injectSheet from 'react-jss';
import {Helmet} from 'react-helmet';
import Hammer from 'react-hammerjs';
import Link from 'gatsby-link';
import slug from 'slug';

import User from './user';
import Settings from './settings';
import styles from './styles';

type Props = {
  classes: Object,
  post: Object,
  onSwipe?: ?Function
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
    const {
        description, settings, photo, date, tags, photographer
    } = post;

    /**
   * Post details such as time, description and tags
   * @method PostDetails
   * @returns {Node} react node
   */
    const PostDetails = () => (
        <div className={classes.detailsContainer}>
            <User
                avatar={photographer.photo}
                username={photographer.name}
                date={date}
            />
            <div className={classes.detailsContent}>
                <p>{description}</p>

                <div className={classes.listContainer}>
                    {tags.map(tag => (
                        <Link
                            className={classes.tag}
                            key={tag.id}
                            to={`/tag/${slug(tag.name)}`}
                        >
                            {tag.name}
                        </Link>
                    ))}
                </div>

                <Settings settings={settings} />
            </div>
        </div>
    );

    const location = typeof window !== 'undefined' && window && window.location;

    return (
        <div className={classes.root} onClick={e => e.stopPropagation()}>
            <Helmet>
                <meta
                    property="og:url"
                    content={location.href}
                />
                <meta property="og:type" content="article" />
                <meta
                    property="og:title"
                    content={`Photo by ${photographer.name}`}
                />
                <meta
                    property="og:description"
                    content={description}
                />
                <meta
                    property="og:image"
                    content={photo.responsiveResolution.src}
                />
            </Helmet>
            <div className={classes.tabletDetailsContainer}>
                <div className={classes.tabletDetailsWrapper}>
                    <PostDetails />
                </div>
            </div>
            <div className={classes.imageContainer}>
                <Hammer onSwipe={props.onSwipe}>
                    <div className={classes.imageWrapper}>
                        <img
                            alt="Post"
                            key={photo.responsiveResolution.src}
                            src={photo.responsiveResolution.src}
                            srcSet={photo.responsiveResolution.srcSet}
                            className={classes.image}
                        />
                    </div>
                </Hammer>
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
