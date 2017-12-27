import {rhythm} from '../../utils/typography';

export default {
    wrapper: {
        display: 'flex',
        position: 'relative',
        height: '100vh'
    },
    caretsWrapper: {
        display: 'flex',
        maxWidth: rhythm(40.25),
        width: '100%',
        marginTop: 20,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    caretLeft: {
        cursor: 'pointer',
        fontSize: '50px',
        color: 'rgba(255,255,255,0.7)',
        userSelect: 'none',
        marginTop: 215
    },
    caretRight: {
        cursor: 'pointer',
        fontSize: '50px',
        color: 'rgba(255,255,255,0.7)',
        userSelect: 'none',
        marginTop: 215
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
