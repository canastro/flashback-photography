// @flow

import * as PropTypes from 'prop-types';
import chunk from 'lodash/chunk';
import React from 'react';
import injectSheet from 'react-jss';

import {rhythm, scale} from '../utils/typography';
import presets from '../utils/presets';
import Post from '../components/post/preview/preview';

// This would normally be in a Redux store or some other global data store.
if (typeof window !== 'undefined') {
    window.postsToShow = 12;
}

const styles = {
    root: {
        display: 'flex',
        alignItems: 'stretch',
        flexShrink: 0,
        flexDirection: 'column'
    },
    postsChunk: {
        display: 'flex',
        alignItems: 'stretch',
        flexShrink: 0,
        flexDirection: 'row',
        marginBottom: rhythm(1 / 8),
        [presets.Tablet]: {
            marginBottom: rhythm(1)
        }
    },
    showMore: {
        ...scale(-0.5),
        border: '1px solid black',
        boxShadow: 0,
        background: 'none',
        color: 'black',
        cursor: 'pointer',
        margin: '0 auto',
        padding: rhythm(1 / 2),
        width: `calc(100vw - ${rhythm(1)})`,
        marginLeft: rhythm(0.5),
        marginRight: rhythm(0.5),
        marginBottom: rhythm(0.5),
        marginTop: rhythm(0.5),
        [presets.Tablet]: {
            borderRadius: '100%',
            margin: '0 auto',
            marginBottom: rhythm(1.5),
            marginTop: rhythm(1.5),
            padding: rhythm(1),
            height: rhythm(5),
            width: rhythm(5),
            lineHeight: rhythm(3),
            textAlign: 'center'
        }
    }
};

type Props = {
    classes: Object,
    location: Object,
    data: Object
};

class Index extends React.Component {
    props: Props;

    static contextTypes = {
        setPosts: PropTypes.func
    };

    constructor() {
        super();
        let postsToShow = 12;
        if (typeof window !== 'undefined') {
            postsToShow = window.postsToShow;
        }

        this.state = {
            showingMore: postsToShow > 12,
            postsToShow
        };
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
        window.postsToShow = this.state.postsToShow;
    }

    update() {
        const distanceToBottom =
            document.documentElement.offsetHeight - (window.scrollY + window.innerHeight);
        if (this.state.showingMore && distanceToBottom < 100) {
            this.setState({postsToShow: this.state.postsToShow + 12});
        }
        this.ticking = false;
    }

    handleScroll = () => {
        if (!this.ticking) {
            this.ticking = true;
            requestAnimationFrame(() => this.update());
        }
    };

    handleMoreClick = () => {
        this.setState({
            postsToShow: this.state.postsToShow + 12,
            showingMore: true
        });
    };

    render() {
        const {classes} = this.props;
        const posts = this.props.data.allContentfulPost.edges.map(e => e.node);

        this.context.setPosts(posts);

        return (
            <div className={classes.root}>
                {chunk(posts.slice(0, this.state.postsToShow), 3).map((item, i) => (
                    <div key={`chunk-${i}`} className={classes.postsChunk}>
                        {item.map(node => (
                            <Post
                                key={node.id}
                                post={node}
                                location={this.props.location}
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

export const pageQuery = graphql`
    query allImages {
        allContentfulPost {
            edges {
                node {
                    id
                    description
                    ...Post_details
                    ...PostDetail_details
                    ...Modal_posts
                }
            }
        }
    }
`;
