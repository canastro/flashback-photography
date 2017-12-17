
import {rhythm} from '../utils/typography';
import presets from '../utils/presets';

export default {
    root: {
        background: 'rgba(0,0,0,0.03)'
    },
    wrapper: {
        minHeight: 'calc(100vh - 100px)'
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
