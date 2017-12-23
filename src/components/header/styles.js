import {rhythm, scale} from '../../utils/typography';

export const burgerStyles = {
    bmBurgerButton: {
        position: 'absolute',
        width: '36px',
        height: '30px',
        left: 'initial',
        top: 20,
        right: 36
    },
    bmBurgerBars: {
        background: '#373a47'
    },
    bmCrossButton: {
        height: '24px',
        width: '24px'
    },
    bmCross: {
        background: '#bdc3c7'
    },
    bmMenuWrap: {
        top: 0
    },
    bmMenu: {
        background: '#373a47',
        padding: '2.5em 1.5em 0',
        fontSize: '1.15em'
    },
    bmMorphShape: {
        fill: '#373a47'
    },
    bmItemList: {
        color: '#b8b7ad',
        padding: '0.8em',
        display: 'flex',
        flexDirection: 'column'
    },
    bmOverlay: {
        background: 'rgba(0, 0, 0, 0.3)',
        left: 0,
        top: 0
    }
};

export default {
    root: {
        background: 'white',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1
    },
    wrapper: {
        maxWidth: 960,
        margin: '0 auto',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    titleLink: {
        padding: rhythm(3 / 4),
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
        marginLeft: 20,
        '&:hover': {
            color: '#000'
        }
    }
};
