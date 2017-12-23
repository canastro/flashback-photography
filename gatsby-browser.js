// @flow
import React from 'react';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';

import createStore from './src/state/create-store';

const windowWidth = window.innerWidth;

type Props = {
  children: Object
};

// remove the JSS style tag generated on the server to avoid conflicts with the one added on the client
exports.onInitialClientRender = () => {
    // eslint-disable-next-line no-undef
    const ssStyles = window.document.getElementById('server-side-jss');
    if (!ssStyles) return;
    ssStyles.parentNode.removeChild(ssStyles);
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
