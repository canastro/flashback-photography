// @flow
import React from 'react';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';

import createStore from './src/state/create-store';

const windowWidth = window.innerWidth;

type Props = {
    children: Object
};

exports.replaceRouterComponent = ({history}) => {
    const store = createStore();

    /**
     * Create a Provider and Router
     * @param {Object} props - react props
     * @returns {Node} react node
     */
    const ConnectedRouterWrapper = (props: Props) => (
        <Provider store={store}>
            <Router history={history}>{props.children}</Router>
        </Provider>
    );

    return ConnectedRouterWrapper;
};

exports.shouldUpdateScroll = () => {
    // Scroll position only matters on mobile as on larger screens, we use a
    // modal.
    if (windowWidth < 750) {
        return true;
    }
    return false;
};
