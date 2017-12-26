import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import {Preview} from './preview';
import styles from './styles';
import {getClasses} from '../../../utils/tests';

const classes = getClasses(styles);

const album = {
    name: 'TEST-NAME',
    cover: {
        responsiveResolution: {
            src: 'TEST-SRC',
            srcSet: 'TEST-SRC-SET'
        }
    }
};

it('should render correctly', () => {
    const output = shallow(<Preview classes={classes} album={album} />);
    expect(shallowToJson(output)).toMatchSnapshot();
});

describe('when mouse enters link', () => {
    let output;

    beforeAll(() => {
        output = shallow(<Preview classes={classes} album={album} />);
        const link = output.find('GatsbyLink');

        expect(output.state().hovering).toEqual(false);
        link.prop('onMouseEnter')();
        output.update();
    });

    it('should update state', () => {
        expect(output.state().hovering).toEqual(true);
    });

    it('should render eye icon', () => {
        expect(output.find('FaEye')).toHaveLength(1);
    });

    it('should render correctly', () => {
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});

describe('when mouse leaves link', () => {
    let output;

    beforeAll(() => {
        output = shallow(<Preview classes={classes} album={album} />);
        output.setState({hovering: true});

        const link = output.find('GatsbyLink');

        expect(output.state().hovering).toEqual(true);
        link.prop('onMouseLeave')();
    });

    it('should update state', () => {
        expect(output.state().hovering).toEqual(false);
    });

    it('should render correctly', () => {
        output.update();
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});
