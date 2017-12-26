// @flow
import React from 'react';
import injectSheet from 'react-jss';

import styles from './styles';

const SIZE = 50;

type Props = {
    classes: Object
};

/**
 * Loader component
 * @param {Object} props - react props
 * @returns {Node} react node
 */
export const Loader = (props: Props) => {
    const {classes} = props;

    return (
        <div className={classes.root}>
            <div className={classes.indicator} role="progressbar">
                <svg
                    className={classes.svgIndeterminate}
                    viewBox={`0 0 ${SIZE} ${SIZE}`}
                >
                    <circle
                        className={classes.circle}
                        cx={SIZE / 2}
                        cy={SIZE / 2}
                        r={(SIZE / 2) - 5}
                        fill="none"
                        strokeWidth={1}
                    />
                </svg>
            </div>
        </div>
    );
};

export default injectSheet(styles)(Loader);
