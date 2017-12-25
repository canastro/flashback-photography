import {scale, rhythm} from '../../../utils/typography';
import presets from '../../../utils/presets';

export default {
    root: {
        display: 'block',
        backgroundColor: 'black',
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
        }
    },
    wrapper: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    image: {
        maxHeight: 200
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
    }
};
