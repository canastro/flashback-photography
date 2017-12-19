import React from 'react';
import {Provider} from 'react-redux';
import {renderToString} from 'react-dom/server';

import createStore from './src/state/create-store';

exports.replaceRenderer = ({bodyComponent, replaceBodyHTMLString}) => {
    const store = createStore();

    /**
     * Generates a Provider component
     * @returns {Node} react node
     */
    const ConnectedBody = () => (
        <Provider store={store}>{bodyComponent}</Provider>
    );

    replaceBodyHTMLString(renderToString(<ConnectedBody />));
};

exports.onRenderBody = ({setPostBodyComponents}) =>
    setPostBodyComponents([
        <script
            key="emailjs-dist"
            type="text/javascript"
            src="https://cdn.emailjs.com/dist/email.min.js"
        />,
        <script
            key="emailjs-initialize"
            type="text/javascript"
            dangerouslySetInnerHTML={{
                __html: '(function(){emailjs.init("user_miNvmuNB4AxQqC3Ebfu5K");})();'
            }}
        />
    ]);
