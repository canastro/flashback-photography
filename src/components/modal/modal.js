// @flow
import React from 'react';
import Modal from 'react-modal';
import CaretRight from 'react-icons/lib/fa/caret-right';
import CaretLeft from 'react-icons/lib/fa/caret-left';
import Close from 'react-icons/lib/md/close';
import findIndex from 'lodash/findIndex';
import mousetrap from 'mousetrap';
import {navigateTo} from 'gatsby-link';
import injectSheet from 'react-jss';

import styles from './styles';

type Props = {
    classes: Object,
    children: Function,
    isOpen: boolean,
    location: Object,
    posts: Array<Object>
};

class MyModal extends React.Component {
    props: Props;

    componentDidMount() {
        mousetrap.bind('left', () => this.previous());
        mousetrap.bind('right', () => this.next());
        mousetrap.bind('spacebar', () => this.next());
    }

    componentWillUnmount() {
        mousetrap.unbind('left');
        mousetrap.unbind('right');
        mousetrap.unbind('spacebar');
    }

    findCurrentIndex() {
        return findIndex(
            this.props.posts,
            post => post.id === this.props.location.pathname.split('/')[1]
        );
    }

    next(e) {
        if (e) {
            e.stopPropagation();
        }

        const currentIndex = this.findCurrentIndex();
        if (currentIndex || currentIndex === 0) {
            const {posts} = this.props;
            let nextPost;
            // Wrap around if at end.
            if (currentIndex + 1 === posts.length) {
                nextPost = posts[0];
            } else {
                nextPost = posts[currentIndex + 1];
            }
            navigateTo(`/${nextPost.id}/`);
        }
    }

    previous(e) {
        if (e) {
            e.stopPropagation();
        }
        const currentIndex = this.findCurrentIndex();
        if (currentIndex || currentIndex === 0) {
            const {posts} = this.props;
            let previousPost;
            // Wrap around if at start.
            if (currentIndex === 0) {
                previousPost = posts.slice(-1)[0];
            } else {
                previousPost = posts[currentIndex - 1];
            }
            navigateTo(`/${previousPost.id}/`);
        }
    }

    render() {
        const modalStyle = {
            overlay: {
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.75)'
            },
            content: {
                position: 'absolute',
                border: 'none',
                background: 'none',
                padding: 0,
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                overflow: 'auto',
                WebkitOverflowScrolling: 'touch'
            }
        };

        const {classes} = this.props;
        return (
            <Modal
                isOpen={this.props.isOpen}
                onRequestClose={() => navigateTo('/')}
                style={modalStyle}
                contentLabel="Modal"
            >
                <div onClick={() => navigateTo('/')} className={classes.wrapper}>
                    <div className={classes.caretsWrapper}>
                        <CaretLeft className={classes.caretLeft} onClick={e => this.previous(e)} />
                        {this.props.children({location: {pathname: this.props.location.pathname}})}
                        <CaretRight className={classes.caretRight} onClick={e => this.next(e)} />
                    </div>
                    <Close onClick={() => navigateTo('/')} className={classes.close} />
                </div>
            </Modal>
        );
    }
}

export default injectSheet(styles)(MyModal);

export const modalFragment = graphql`
    fragment Modal_posts on ContentfulPost {
        id
    }
`;
