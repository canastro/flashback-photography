import {rhythm} from '../../utils/typography';

export default {
    wrapper: {
        display: 'flex',
        position: 'relative',
        height: '100vh'
    },
    caretsWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyItems: 'center',
        maxWidth: rhythm(40.25), // Gets it right around Instagram's maxWidth.
        margin: 'auto',
        width: '100%'
    },
    caretLeft: {
        cursor: 'pointer',
        fontSize: '50px',
        color: 'rgba(255,255,255,0.7)',
        userSelect: 'none'
    },
    caretRight: {
        cursor: 'pointer',
        fontSize: '50px',
        color: 'rgba(255,255,255,0.7)',
        userSelect: 'none'
    },
    close: {
        cursor: 'pointer',
        color: 'rgba(255,255,255,0.8)',
        fontSize: '30px',
        position: 'absolute',
        top: rhythm(1 / 4),
        right: rhythm(1 / 4)
    }
};
