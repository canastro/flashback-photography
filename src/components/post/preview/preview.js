// @flow
import React from 'react';
import Link from 'gatsby-link';
import injectSheet from 'react-jss';
import EyeIcon from 'react-icons/lib/fa/eye';

import styles from './styles';

type Props = {
    classes: Object,
    post: Object
};

/**
 * Create a post preview
 * @method Post
 * @param  {Object} props - react props
 * @returns {Node} Post preview
 */
class Post extends React.Component {
    props: Props;

    /**
     * Constructor, initializes state
     * @method  constructor
     * @param   {Object} props - react props
     */
    constructor(props) {
        super(props);
        this.state = {
            hovering: false
        };
    }

    /**
     * Renders the post preview
     * @method  render
     * @returns {Node} - react node
     */
    render() {
        const {classes, post} = this.props;
        const {preview, id} = post;
        return (
            <Link
                to={`/post/${id}/`}
                className={classes.root}
                onMouseEnter={() => {
                    this.setState({hovering: true});
                }}
                onMouseLeave={() => {
                    this.setState({hovering: false});
                }}
            >
                <div className={classes.wrapper}>
                    <img
                        alt="Post Preview"
                        src={preview.responsiveResolution.src}
                        srcSet={preview.responsiveResolution.srcSet}
                        className={classes.image}
                    />
                </div>
                {/* overlay */}
                {this.state.hovering && (
                    <div className={classes.overlay}>
                        <EyeIcon className={classes.icon} />
                    </div>
                )}
            </Link>
        );
    }
}

export default injectSheet(styles)(Post);

export const postFragment = graphql`
    fragment Post_details on ContentfulPost {
        id
        preview: photo {
            responsiveResolution(width: 200) {
                width
                height
                src
                srcSet
            }
        }
    }
`;
