import presets from '../../../utils/presets';
import typography, {rhythm, scale} from '../../../utils/typography';

export default {
    root: {
        maxHeight: 500,
        backgroundColor: 'black',
        display: 'flex',
        alignItems: 'stretch',
        flexDirection: 'column',
        width: '100%',
        [presets.Tablet]: {
            flexDirection: 'row-reverse'
        }
    },
    detailsContainer: {
        ...scale(-2 / 5),
        backgroundColor: 'white',
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
        backgroundColor: 'white',
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
        backgroundColor: 'lightgray',
        flex: '1 0 0',
        margin: 'auto',
        width: '100%'
    },
    listContainer: {
        display: 'flex',
        flexDirection: 'column'
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
        margin: '10px 0 0 0',
        textAlign: 'center',
        width: 100,
        color: 'inherit',
        textDecoration: 'none',
        '&:hover': {
            backgroundColor: '#696969'
        }
    }
};
