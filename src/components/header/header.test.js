import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import {Header} from './header';
import styles from './styles';
import {getClasses} from '../../utils/tests';

const classes = getClasses(styles);

it('should render correctly', () => {
    const test = shallow(<Header classes={classes} />);
    expect(shallowToJson(test)).toMatchSnapshot();
});

describe('on menu state change', () => {
    it('should update state', () => {
        const output = shallow(<Header classes={classes} />);
        const menu = output.find('Menu');

        expect(output.state().isOpen).toEqual(false);
        menu.prop('onStateChange')({isOpen: true});
        expect(output.state().isOpen).toEqual(true);
    });
});

describe('on menu link click', () => {
    it('should update state', () => {
        const output = shallow(<Header classes={classes} />);
        const link = output.find('GatsbyLink').at(2);

        output.setState({isOpen: true});

        expect(output.state().isOpen).toEqual(true);
        link.simulate('click');
        expect(output.state().isOpen).toEqual(false);
    });
});
