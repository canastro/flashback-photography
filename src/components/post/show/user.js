// @flow
import React from 'react';
import injectSheet from 'react-jss';

import presets from '../../../utils/presets';
import {rhythm} from '../../../utils/typography';

const styles = {
    root: {
        height: 58,
        [presets.Tablet]: {
            marginBottom: `calc(${rhythm(3 / 4)} + 1px)`,
            borderBottom: '1px solid rgba(0,0,0,0.1)'
        }
    },
    image: {
        borderRadius: '100%',
        height: 25,
        float: 'left',
        margin: 0,
        marginRight: rhythm(1 / 2)
    },
    title: {
        lineHeight: rhythm(1),
        marginBottom: 5
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: rhythm(1 / 2)
    }
};

type Props = {
    classes: Object,
    username: string,
    date: string,
    avatar: Object
};

/**
 * Create user bar
 * @method User
 * @param  {Object} props - react props
 * @returns {Node} react node
 */
const User = (props: Props) => (
    <div className={props.classes.root}>
        <img
            src={props.avatar.responsiveResolution.src}
            alt={props.username}
            className={props.classes.image}
        />
        <div className={props.classes.wrapper}>
            <h5 className={props.classes.title}>{props.username}</h5>
            <small className={props.classes.date}>{props.date}</small>
        </div>
    </div>
);

export default injectSheet(styles)(User);
