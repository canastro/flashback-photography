// @flow

import * as PropTypes from 'prop-types';
import chunk from 'lodash/chunk';
import React from 'react';
import injectSheet from 'react-jss';

import Post from '../preview/preview';
import styles from './styles';

// This would normally be in a Redux store or some other global data store.
if (typeof window !== 'undefined') {
    window.postsToShow = 12;
}

type Props = {
    classes: Object,
    posts: ?Array<Object>
};

/**
 * Main page component
 * @extends React
 */
class Index extends React.Component {
    props: Props;

    static contextTypes = {
        setPosts: PropTypes.func
    };

    /**
     * Constructor - initializes the state
     * @method  constructor
     */
    constructor() {
        super();
        const postsToShow = typeof window !== 'undefined' ? window.postsToShow : 12;

        this.state = {
            showingMore: postsToShow > 12,
            postsToShow
        };
    }

    /**
     * Add scroll event listener
     * @method  componentDidMount
     */
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    /**
     * Remove scroll event listener and set the corrent posts to show value
     * TODO: use redux for this
     * @method  componentWillUnmount
     */
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
        window.postsToShow = this.state.postsToShow;
    }

    /**
     * Update the number of posts to show
     * @method  update
     */
    update() {
        const distanceToBottom =
            document.documentElement.offsetHeight - (window.scrollY + window.innerHeight);

        if (this.state.showingMore && distanceToBottom < 100) {
            this.setState({postsToShow: this.state.postsToShow + 12});
        }

        this.ticking = false;
    }

    /**
     * Handle the scroll event
     * @method  handleScroll
     */
    handleScroll = () => {
        if (!this.ticking) {
            this.ticking = true;
            requestAnimationFrame(() => this.update());
        }
    };

    /**
     * Handle the click more button
     * It sets the state to show the next 12 images
     * @method  handleMoreClick
     */
    handleMoreClick = () => {
        this.setState({
            postsToShow: this.state.postsToShow + 12,
            showingMore: true
        });
    };

    /**
     * Render the component
     * @method  render
     * @returns {Node} react node
     */
    render() {
        const {classes, posts = []} = this.props;
        this.context.setPosts(posts);

        return (
            <div className={classes.root}>
                {chunk(posts.slice(0, this.state.postsToShow), 3).map((item, i) => (
                    <div key={`chunk-${i}`} className={classes.postsChunk}>
                        {item.map(node => (
                            <Post
                                key={node.id}
                                post={node}
                            />
                        ))}
                    </div>
                ))}

                {!this.state.showingMore && (
                    <a className={classes.showMore} onClick={this.handleMoreClick}>
                        Load More
                    </a>
                )}
            </div>
        );
    }
}

export default injectSheet(styles)(Index);
