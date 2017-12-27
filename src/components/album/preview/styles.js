import {scale, rhythm} from '../../../utils/typography';
import presets from '../../../utils/presets';

export default {
    root: {
        display: 'block',
        backgroundColor: 'lightgray',
        flex: '1 0 0%',
        marginRight: rhythm(1 / 8),
        width: '100%',
        maxWidth: 290.1,
        position: 'relative',
        [presets.Tablet]: {
            marginRight: rhythm(1)
        },
        ':last-child': {
            marginRight: 0
        },
        color: 'inherit',
        textTransform: 'uppercase',
        textDecoration: 'none'
    },
    wrapper: {
        flexDirection: 'column',
        flexShrink: 0,
        position: 'relative',
        overflow: 'hidden',
        outline: 0
    },
    image: {
        margin: 0,
        height: '100%',
        width: '100%',
        verticalAlign: 'baseline',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        outline: 'none'
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        ...scale(2 / 5)
    },
    icon: {
        fontSize: '90%',
        marginRight: rhythm(1 / 4)
    },
    title: {
        position: 'absolute',
        bottom: 0,
        height: 40,
        backgroundColor: 'white',
        width: '100%',
        opacity: 0.8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
};
