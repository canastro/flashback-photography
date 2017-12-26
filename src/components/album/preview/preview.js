// @flow
import React from 'react';
import Link from 'gatsby-link';
import injectSheet from 'react-jss';
import EyeIcon from 'react-icons/lib/fa/eye';
import slug from 'slug';

import styles from './styles';

type Props = {
    classes: Object,
    album: Object
};

/**
 * Create a post preview
 * @method Preview
 * @param  {Object} props - react props
 * @returns {Node} Preview preview
 */
export class Preview extends React.Component {
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
        const {classes, album} = this.props;
        const {cover, name} = album;
        return (
            <Link
                to={`/album/${slug(name)}/`}
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
                        alt="Preview Preview"
                        src={cover.responsiveResolution.src}
                        srcSet={cover.responsiveResolution.srcSet}
                        className={classes.image}
                    />
                </div>

                {this.state.hovering && (
                    <div className={classes.overlay}>
                        <EyeIcon className={classes.icon} />
                    </div>
                )}
                <div className={classes.title}>{name}</div>
            </Link>
        );
    }
}

export default injectSheet(styles)(Preview);
