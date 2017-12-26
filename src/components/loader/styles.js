export default {
    root: {
        position: 'fixed',
        height: '100%',
        width: '100%',
        top: 0,
        left: 0,
        backgroundColor: 'black',
        opacity: 0.5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10
    },
    indicator: {
        display: 'inline-block',
        color: '#fff',
        width: 100
    },
    svgIndeterminate: {
        animation: 'circular-rotate 1.4s linear infinite'
    },
    circle: {
        stroke: 'currentColor',
        strokeLinecap: 'round',
        animation: 'circular-dash 1.4s ease-in-out infinite',
        // Some default value that looks fine waiting for the animation to kicks in.
        strokeDasharray: '80,200',
        strokeDashoffset: 0
    },
    '@keyframes circular-rotate': {
        '100%': {
            transform: 'rotate(360deg)'
        }
    },
    '@keyframes circular-dash': {
        '0%': {
            strokeDasharray: '1,200',
            strokeDashoffset: 0
        },
        '50%': {
            strokeDasharray: '100,200',
            strokeDashoffset: -15
        },
        '100%': {
            strokeDasharray: '100,200',
            strokeDashoffset: -120
        }
    }
};
