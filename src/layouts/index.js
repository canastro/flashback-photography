// @flow
import * as PropTypes from 'prop-types';
import React from 'react';
import CameraIcon from 'react-icons/lib/io/ios-flower';
import Link from 'gatsby-link';
import injectSheet from 'react-jss';

// Load the css for the Space Mono font.
import 'typeface-space-mono';

import {rhythm, scale} from '../utils/typography';
import presets from '../utils/presets';
import Modal from '../components/modal/modal';

const styles = {
    root: {
        background: 'rgba(0,0,0,0.03)',
        minHeight: '100vh'
    },
    wrapper: {
        background: 'white',
        borderBottom: '1px solid rgba(0,0,0,0.08)'
    },
    linkWrapper: {
        padding: rhythm(3 / 4),
        paddingBottom: `calc(${rhythm(3 / 4)} - 1px)`,
        maxWidth: 960,
        margin: '0 auto',
        overflow: 'hidden'
    },
    titleLink: {
        display: 'inline-block',
        float: 'left',
        textDecoration: 'none'
    },
    title: {
        ...scale(4 / 5),
        lineHeight: 1,
        margin: 0,
        overflow: 'hidden'
    },
    titleSpan: {
        paddingLeft: `calc(${rhythm(1)} - 1px)`,
        borderLeft: '1px solid rgba(0,0,0,0.3)',
        lineHeight: 1,
        marginLeft: rhythm(1)
    },
    icon: {
        top: -4,
        display: 'inline-block',
        position: 'relative'
    },
    link: {
        color: 'inherit',
        display: 'inline-block',
        float: 'right',
        lineHeight: '35px',
        textDecoration: 'none',
        marginLeft: 20
    },
    modalWrapper: {
        maxWidth: 960,
        margin: '0 auto',
        [presets.Tablet]: {
            padding: rhythm(3 / 4)
        }
    }
};

type Props = {
    classes: Object,
    children: Function,
    location: Object
};

class DefaultLayout extends React.Component {
    props: Props;

    static childContextTypes = {
        setPosts: PropTypes.func
    };

    getChildContext() {
        return {
            setPosts: posts => {
                this.posts = posts;
            }
        };
    }

    componentDidMount() {
        // Create references to html/body elements
        this.htmlElement = document.querySelector('html');
        this.bodyElement = document.querySelector('body');

        // Cache the window width.
        this.windowWidth = window.innerWidth;
    }

    componentWillReceiveProps(nextProps) {
        // if we're changing to a non-homepage page, put things in
        // a modal (unless we're on mobile).
        if (
            nextProps.location.pathname !== '/' &&
            nextProps.location.pathname !== '/about/' &&
            this.windowWidth > 750
        ) {
            // Freeze the background from scrolling.
            this.htmlElement.style.overflow = 'hidden';
            this.bodyElement.style.overflow = 'hidden';

            // Always set overflow-y to scroll so the scrollbar stays visible avoiding
            // weird jumping.
            this.htmlElement.style.overflowY = 'scroll';
        } else {
            // Otherwise we're navigating back home so delete old home so the
            // modal can be destroyed.
            delete this.modalBackgroundChildren;
            this.htmlElement.style.overflow = 'visible';
            this.bodyElement.style.overflow = 'visible';

            // Always set overflow-y to scroll so the scrollbar stays visible avoiding
            // weird jumping.
            this.htmlElement.style.overflowY = 'scroll';
        }
    }

    render() {
        const {location, classes} = this.props;
        let isModal = false;
        if (
            this.props.location.pathname !== '/' &&
            this.props.location.pathname !== '/about/' &&
            this.windowWidth > 750
        ) {
            isModal = true;
        }

        return (
            <div className={classes.root}>
                <div className={classes.wrapper}>
                    <div className={classes.linkWrapper}>
                        <Link to="/" className={classes.titleLink}>
                            <h1 className={classes.title}>
                                <CameraIcon className={classes.icon} />
                                <span className={classes.titleSpan}>Helianthus</span>
                            </h1>
                        </Link>

                        <Link to="/about/" className={classes.link}>
                            About
                        </Link>

                        <Link to="/albuns/" className={classes.link}>
                            Albuns
                        </Link>
                    </div>
                </div>

                <div className={classes.modalWrapper}>
                    <div>
                        {isModal
                            ? this.props.children({
                                  ...this.props,
                                  location: {pathname: '/'}
                              })
                            : this.props.children()}
                    </div>

                    <div>
                        {isModal && (
                            <Modal isOpen posts={this.posts} location={location}>
                                {this.props.children}
                            </Modal>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default injectSheet(styles)(DefaultLayout);
