// @flow
import * as PropTypes from 'prop-types';
import React from 'react';
import CameraIcon from 'react-icons/lib/io/ios-flower';
import Link from 'gatsby-link';
import injectSheet from 'react-jss';

// Load the css for the Space Mono font.
import 'typeface-space-mono';

import styles from './styles';
import Modal from '../components/modal/modal';

type Props = {
    classes: Object,
    children: Function,
    location: Object
};

const listsOfPosts = ['/tag', '/album'];

/**
 * Returns true if should render the content in a modal
 * @method  shouldRenderInModal
 * @param   {Number} windowWidth - window width
 * @param   {String} pathname - path name
 * @returns {Boolean} boolean
 */
const shouldRenderInModal = (windowWidth, pathname) => {
    const paths = ['/about', ...listsOfPosts];
    if (windowWidth < 750) {
        return false;
    }

    return pathname !== '/' && !paths.some(path => pathname.includes(path));
};

/**
 * Layout component
 * @extends React
 */
class DefaultLayout extends React.Component {
    props: Props;

    static childContextTypes = {
        setPosts: PropTypes.func
    };

    /**
     * Constructor
     * @method  constructor
     * @param   {Object} props - react props;
     */
    constructor(props) {
        super(props);

        this.state = {previousPathname: '/'};
    }

    /**
     * Provide a setPosts function in order to have posts available
     * @method  getChildContext
     * @returns {Object} child context functions
     */
    getChildContext() {
        return {
            setPosts: (posts) => {
                this.posts = posts;
            }
        };
    }

    /**
     * React lifecycle method
     * @method  componentDidMount
     */
    componentDidMount() {
        // Create references to html/body elements
        this.htmlElement = document.querySelector('html');
        this.bodyElement = document.querySelector('body');

        // Cache the window width.
        this.windowWidth = window.innerWidth;
    }

    /**
     * React lifecycle method
     * @method  componentWillReceiveProps
     * @param   {Object} nextProps - react next props
     */
    componentWillReceiveProps(nextProps) {
        const {pathname} = this.props.location;
        if (listsOfPosts.some(path => pathname.includes(path)) || pathname === '/') {
            this.setState({previousPathname: this.props.location.pathname});
        }

        // if we're changing to a non-homepage page, put things in
        // a modal (unless we're on mobile).
        if (shouldRenderInModal(this.windowWidth, nextProps.location.pathname)) {
            // Freeze the background from scrolling.
            this.htmlElement.style.overflow = 'hidden';
            this.bodyElement.style.overflow = 'hidden';

            // Always set overflow-y to scroll so the scrollbar stays visible avoiding
            // weird jumping.
            this.htmlElement.style.overflowY = 'scroll';
            return;
        }

        // Otherwise we're navigating back home so delete old home so the
        // modal can be destroyed.
        delete this.modalBackgroundChildren;
        this.htmlElement.style.overflow = 'visible';
        this.bodyElement.style.overflow = 'visible';

        // Always set overflow-y to scroll so the scrollbar stays visible avoiding
        // weird jumping.
        this.htmlElement.style.overflowY = 'scroll';
    }

    /**
     * Render method
     * @method  render
     * @returns {Node} react node
     */
    render() {
        const {location, classes} = this.props;
        const isModal = shouldRenderInModal(this.windowWidth, this.props.location.pathname);
        const pathname = this.state.previousPathname;

        return (
            <div className={classes.root}>
                <div className={classes.wrapper}>
                    <div className={classes.header}>
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

                            <Link to="/albums/" className={classes.link}>
                                Albums
                            </Link>
                        </div>
                    </div>

                    <div className={classes.modalWrapper}>
                        <div>
                            {isModal
                                ? this.props.children({...this.props, location: {pathname}})
                                : this.props.children()}
                        </div>

                        <div>
                            {isModal && (
                                <Modal
                                    isOpen
                                    posts={this.posts}
                                    location={location}
                                    exitPathname={pathname}
                                >
                                    {this.props.children}
                                </Modal>
                            )}
                        </div>
                    </div>
                </div>

                <footer className={classes.footer}>
                    <small>© Copyright 2008 - 2017. All rights reserved.</small>
                    <small>Powered by Ricardo Canastro</small>
                </footer>
            </div>
        );
    }
}

export default injectSheet(styles)(DefaultLayout);
