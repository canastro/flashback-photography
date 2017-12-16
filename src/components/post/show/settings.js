// @flow
import React from 'react';
import injectSheet from 'react-jss';

import timer from '../../../../static/images/timer.png';
import aperture from '../../../../static/images/aperture.png';
import camera from '../../../../static/images/camera.png';
import focalLength from '../../../../static/images/focal-length.png';
import iso from '../../../../static/images/iso.png';

import styles from './styles';

type Props = {
    classes: Object,
    settings: ?Object
};

/**
 * Photo settings, camera configurations and conditions
 * @method Settings
 * @param  {Object} props - react props
 * @returns {Node} react node
 */
const Settings = (props: Props) => {
    if (!props.settings) return null;

    return (
        <ul className={props.classes.listContainer}>
            <li className={props.classes.settingItem}>
                <img className={props.classes.icon} alt="Machine" src={camera} />
                {props.settings.machine}
            </li>
            <li className={props.classes.settingItem}>
                <img className={props.classes.icon} alt="Focal Length" src={focalLength} />
                {props.settings.focalLength}
            </li>
            <li className={props.classes.settingItem}>
                <img className={props.classes.icon} alt="Aperture" src={aperture} />
                {props.settings.aperture}
            </li>
            <li className={props.classes.settingItem}>
                <img className={props.classes.icon} alt="Exposure Time" src={timer} />
                {props.settings.exposureTime}
            </li>
            <li className={props.classes.settingItem}>
                <img className={props.classes.icon} alt="ISO" src={iso} />
                {props.settings.iso}
            </li>
        </ul>
    );
};

export default injectSheet(styles)(Settings);
