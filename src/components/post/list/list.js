// @flow
import React from 'react';
import chunk from 'lodash/chunk';
import injectSheet from 'react-jss';

import Post from '../preview/preview';
import styles from './styles';

type Props = {
    classes: Object,
    posts: ?Array<Object>,
    visiblePosts: number,
    onVisiblePostsChange: Function
};

/**
 * Main page component
 * @extends React
 */
class Index extends React.Component {
    props: Props;

    /**
     * Constructor - initializes the state
     * @method  constructor
     * @param {Object} props - react props
     */
    constructor(props: Props) {
        super(props);

        this.state = {
            showingMore: props.visiblePosts > 12
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
    }

    /**
     * Update the number of posts to show
     * @method  update
     */
    update() {
        const distanceToBottom =
            document.documentElement.offsetHeight - (window.scrollY + window.innerHeight);

        if (this.state.showingMore && distanceToBottom < 100 && this.props.posts.length % 12 === 0) {
            this.props.onVisiblePostsChange(this.props.visiblePosts + 12);
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
        this.props.onVisiblePostsChange(this.props.visiblePosts + 12);

        this.setState({
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

        return (
            <div className={classes.root}>
                {chunk(posts.slice(0, this.props.visiblePosts), 3).map((item, i) => (
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
