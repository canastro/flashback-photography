import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {graphql} from 'graphql';

global.graphql = graphql;

Enzyme.configure({adapter: new Adapter()});
