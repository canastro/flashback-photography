// @flow
import React from 'react';
import CameraIcon from 'react-icons/lib/io/ios-flower';
import Link from 'gatsby-link';
import injectSheet from 'react-jss';
import {slide as Menu} from 'react-burger-menu';

import styles, {burgerStyles} from './styles';

type Props = {
    classes: Object
};

const isMobile = window.innerWidth <= 750;

/**
 * Get menu based on window size
 * @method  getMenu
 * @param   {Object} classes - jss classes
 * @returns {Node} react node
 */
const getMenu = (classes: Object) => {
    const baseMenus = [
        <Link key="contact" to="/contact/" className={classes.link}>
            Contact
        </Link>,
        <Link key="about" to="/about/" className={classes.link}>
            About
        </Link>,
        <Link key="album" to="/albums/" className={classes.link}>
            Albums
        </Link>
    ];

    if (!isMobile) {
        return baseMenus;
    }

    return (
        <Menu
            className={classes.menu}
            right
            pageWrapId="page-wrap"
            outerContainerId="outer-container"
            styles={burgerStyles}
        >
            <Link to="/" className={classes.link}>
                Home
            </Link>

            {baseMenus}
        </Menu>
    );
};

/**
 * Header component
 * @method Header
 * @param  {Object} props - react props
 * @returns {Node} react node
 */
const Header = (props: Props) => (
    <div className={props.classes.root}>
        <div className={props.classes.wrapper}>
            <Link to="/" className={props.classes.titleLink}>
                <h1 className={props.classes.title}>
                    <CameraIcon className={props.classes.icon} />
                    <span className={props.classes.titleSpan}>Helianthus</span>
                </h1>
            </Link>

            <div>{getMenu(props.classes)}</div>
        </div>
    </div>
);

export default injectSheet(styles)(Header);
