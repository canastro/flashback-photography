import {rhythm, scale} from '../../../utils/typography';
import presets from '../../../utils/presets';

export default {
    root: {
        display: 'flex',
        alignItems: 'stretch',
        flexShrink: 0,
        flexDirection: 'column'
    },
    postsChunk: {
        display: 'flex',
        alignItems: 'stretch',
        flexShrink: 0,
        flexDirection: 'row',
        marginBottom: rhythm(1 / 8),
        [presets.Tablet]: {
            marginBottom: rhythm(1)
        }
    },
    showMore: {
        ...scale(-0.5),
        border: '1px solid black',
        boxShadow: 0,
        background: 'none',
        color: 'black',
        cursor: 'pointer',
        margin: '0 auto',
        padding: rhythm(1 / 2),
        width: `calc(100vw - ${rhythm(1)})`,
        marginLeft: rhythm(0.5),
        marginRight: rhythm(0.5),
        marginBottom: rhythm(0.5),
        marginTop: rhythm(0.5),
        [presets.Tablet]: {
            margin: '0 auto',
            marginBottom: rhythm(1.5),
            marginTop: rhythm(1.5),
            height: rhythm(2),
            width: rhythm(5),
            textAlign: 'center'
        },
        '&:hover': {
            backgroundColor: '#ccc'
        }
    }
};
