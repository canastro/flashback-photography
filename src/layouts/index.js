// @flow
import React from 'react';
import {connect} from 'react-redux';
import injectSheet from 'react-jss';
import {Helmet} from 'react-helmet';

// Load the css for the Space Mono font.
// import 'typeface-space-mono';

import styles from './styles';
import Header from '../components/header/header';
import Modal from '../components/modal/modal';

type Props = {
    classes: Object,
    children: Function,
    location: Object,
    posts: Array<Object>
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
    if (windowWidth < 750) {
        return false;
    }

    return pathname.includes('/post');
};

/**
 * Layout component
 * @extends React
 */
class DefaultLayout extends React.Component {
    props: Props;

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
        const {location, posts, classes} = this.props;
        const isModal = shouldRenderInModal(this.windowWidth, this.props.location.pathname);
        const pathname = this.state.previousPathname;

        return (
            <div className={classes.root}>
                <Helmet>
                    <title>Flashback</title>
                    <meta charSet="UTF-8" />
                    <meta name="description" content="Flashback Photography" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta name="author" content="Ricardo Canastro" />
                    <meta name="keywords" content="flash,flashback,photography,photo" />
                    <meta property="fb:app_id" content="1593275980765181" />
                </Helmet>
                <div id="outer-container" className={classes.wrapper}>
                    <Header />

                    <div id="page-wrap" className={classes.modalWrapper}>
                        <div>
                            {isModal
                                ? this.props.children({...this.props, location: {pathname}})
                                : this.props.children()}
                        </div>

                        <div>
                            {isModal && (
                                <Modal
                                    isOpen
                                    posts={posts}
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
                    <small><span role="img" aria-label="">©</span> Copyright 2008 - 2017. All rights reserved.</small>
                    <small>Powered by Ricardo Canastro</small>
                </footer>
            </div>
        );
    }
}

/**
 * Maps the state
 * @param {Object} state - redux store
 * @returns {Object} mapped state
 */
const mapStateToProps = (state: Object) => ({posts: state.photos.posts});

export default connect(mapStateToProps, {})(injectSheet(styles)(DefaultLayout));
