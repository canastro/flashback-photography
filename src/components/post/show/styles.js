import presets from '../../../utils/presets';
import typography, {rhythm, scale} from '../../../utils/typography';

export default {
    root: {
        background: 'white',
        display: 'flex',
        alignItems: 'stretch',
        flexDirection: 'column',
        width: '100%',
        [presets.Tablet]: {
            flexDirection: 'row-reverse',
            marginTop: rhythm(1)
        }
    },
    detailsContainer: {
        ...scale(-2 / 5),
        lineHeight: typography.options.baseLineHeight,
        height: '100%'
    },
    detailsContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: 'calc(100% - 80px)'
    },
    date: {
        color: 'rgba(0,0,0,0.4)',
        float: 'right'
    },
    tabletDetailsContainer: {
        padding: rhythm(3 / 4),
        paddingBottom: 0,
        [presets.Tablet]: {
            width: rhythm(13),
            padding: rhythm(1)
        }
    },
    tabletDetailsWrapper: {
        display: 'none',
        [presets.Tablet]: {
            display: 'block',
            height: '100%'
        }
    },
    mobileDetailsWrapper: {
        background: 'white',
        padding: rhythm(3 / 4),
        display: 'block',
        [presets.Tablet]: {
            display: 'none'
        }
    },
    imageContainer: {
        display: 'block',
        backgroundColor: 'lightgray',
        flex: '1 0 0%',
        width: '100%',
        position: 'relative'
    },
    imageWrapper: {
        flexDirection: 'column',
        flexShrink: 0,
        position: 'relative',
        paddingBottom: '100%',
        overflow: 'hidden'
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
        right: 0
    },
    listContainer: {
        padding: 0,
        margin: 0
    },
    settingItem: {
        listStyle: 'none',
        padding: 0,
        height: 25,
        display: 'flex',
        alignItems: 'center'
    },
    icon: {
        marginRight: 10
    },
    tag: {
        backgroundColor: '#ccc',
        listStyle: 'none',
        margin: '10px 0 0 0',
        padding: 0,
        textAlign: 'center',
        width: 100
    }
};
