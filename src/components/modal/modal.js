// @flow
import React from 'react';
import Modal from 'react-modal';
import CaretRight from 'react-icons/lib/fa/caret-right';
import CaretLeft from 'react-icons/lib/fa/caret-left';
import Close from 'react-icons/lib/md/close';
import mousetrap from 'mousetrap';
import {navigateTo} from 'gatsby-link';
import injectSheet from 'react-jss';

import styles from './styles';

type Props = {
    classes: Object,
    children: Function,
    navigate: Function,
    isOpen: boolean,
    location: Object,
    exitPathname: string,
    posts: ?Array<Object>
};

/**
 * Modal component
 * @extends React
 */
class MyModal extends React.Component {
    props: Props;

    /**
     * Bind events
     * @method  componentDidMount
     */
    componentDidMount() {
        Modal.setAppElement('body');

        mousetrap.bind('left', () => this.previous());
        mousetrap.bind('right', () => this.next());
        mousetrap.bind('spacebar', () => this.next());
    }

    /**
     * Unbind events
     * @method  componentWillUnmount
     */
    componentWillUnmount() {
        mousetrap.unbind('left');
        mousetrap.unbind('right');
        mousetrap.unbind('spacebar');
    }

    /**
     * Get the current post id based on the current location pathname
     * @method getCurrentPostId
     * @returns {String} post id
     */
    getCurrentPostId() {
        const id = this.props.location.pathname.split('/post/')[1];
        return id.endsWith('/') ? id.slice(0, -1) : id;
    }

    /**
     * Next click handler
     * @method  next
     * @param   {Object}   e - event
     */
    next(e) {
        if (e) {
            e.stopPropagation();
        }

        this.props.navigate(this.props.posts, this.getCurrentPostId(), 'next');
    }

    /**
     * Previous click handler
     * @method  next
     * @param   {Object}   e - event
     */
    previous(e) {
        if (e) {
            e.stopPropagation();
        }

        this.props.navigate(this.props.posts, this.getCurrentPostId(), 'previous');
    }

    /**
     * Render modal
     * @method  render
     * @returns {Node} react node
     */
    render() {
        const modalStyle = {
            overlay: {
                position: 'fixed',
                top: 75,
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

        const {classes, exitPathname} = this.props;
        return (
            <Modal
                isOpen={this.props.isOpen}
                onRequestClose={() => navigateTo(exitPathname)}
                style={modalStyle}
                contentLabel="Modal"
            >
                <div onClick={() => navigateTo(exitPathname)} className={classes.wrapper}>
                    <div className={classes.caretsWrapper}>
                        <CaretLeft className={classes.caretLeft} onClick={e => this.previous(e)} />
                        {this.props.children({location: {pathname: this.props.location.pathname}})}
                        <CaretRight className={classes.caretRight} onClick={e => this.next(e)} />
                    </div>
                    <Close onClick={() => navigateTo(exitPathname)} className={classes.close} />
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
