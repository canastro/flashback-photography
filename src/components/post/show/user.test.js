import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import {User} from './user';
import styles from './styles';
import {getClasses} from '../../../utils/tests';


const classes = getClasses(styles);

describe('when no settings are provided', () => {
    it('should render correctly', () => {
        const avatar = {
            responsiveResolution: {
                src: 'AVATAR-SRC'
            }
        };

        const output = shallow(
            <User
                classes={classes}
                username="TEST-USERNAME"
                date="12 Jul 2017"
                avatar={avatar}
            />
        );

        expect(shallowToJson(output)).toMatchSnapshot();
    });
});
