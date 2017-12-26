import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import {Settings} from './settings';
import styles from './styles';
import {getClasses} from '../../../utils/tests';


const classes = getClasses(styles);

describe('when no settings are provided', () => {
    it('should render correctly', () => {
        const output = shallow(<Settings classes={classes} />);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});


describe('when settings are provided', () => {
    it('should render correctly', () => {
        const settings = {
            iso: 'TEST-ISO',
            exposureTime: 'TEST-EXPOSURE-TIME',
            aperture: 'TEST-APERTURE',
            focalLength: 'TEST-FOCAL-LENGTH',
            machine: 'TEST-MACHINE'
        };

        const output = shallow(<Settings classes={classes} settings={settings} />);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});
