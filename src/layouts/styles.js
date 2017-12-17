
import {rhythm, scale} from '../utils/typography';
import presets from '../utils/presets';

export default {
    root: {
        background: 'rgba(0,0,0,0.03)'
    },
    wrapper: {
        minHeight: 'calc(100vh - 100px)'
    },
    header: {
        background: 'white',
        borderBottom: '1px solid rgba(0,0,0,0.08)'
    },
    linkWrapper: {
        padding: rhythm(3 / 4),
        paddingBottom: `calc(${rhythm(3 / 4)} - 1px)`,
        maxWidth: 960,
        margin: '0 auto',
        overflow: 'hidden'
    },
    titleLink: {
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
        marginLeft: 20
    },
    modalWrapper: {
        maxWidth: 960,
        margin: '0 auto',
        [presets.Tablet]: {
            padding: rhythm(3 / 4)
        }
    },
    footer: {
        color: '#fff',
        backgroundColor: '#000',
        width: '100%',
        marginTop: 20,
        height: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    }
};
