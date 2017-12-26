import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import {Loader} from './loader';
import styles from './styles';
import {getClasses} from '../../utils/tests';

const classes = getClasses(styles);

it('should render correctly', () => {
    const test = shallow(<Loader classes={classes} />);
    expect(shallowToJson(test)).toMatchSnapshot();
});
