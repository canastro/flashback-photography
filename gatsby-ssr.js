import React from 'react';
import {Provider} from 'react-redux';
import {renderToString} from 'react-dom/server';
import {JssProvider, SheetsRegistry} from 'react-jss';

import createStore from './src/state/create-store';

exports.replaceRenderer = ({
    bodyComponent,
    replaceBodyHTMLString,
    setHeadComponents
}) => {
    const store = createStore();
    const sheets = new SheetsRegistry();

    /**
   * Generates a Provider component
   * @returns {Node} react node
   */
    const ConnectedBody = () => (
        <JssProvider registry={sheets}>
            <Provider store={store}>{bodyComponent}</Provider>
        </JssProvider>
    );

    replaceBodyHTMLString(renderToString(<ConnectedBody />));
    setHeadComponents([
        <style
            type="text/css"
            id="server-side-jss"
            key="server-side-jss"
            dangerouslySetInnerHTML={{__html: sheets.toString()}}
        />
    ]);
};

exports.onRenderBody = ({setPostBodyComponents}) =>
    setPostBodyComponents([
        <script
            async
            key="emailjs-dist"
            type="text/javascript"
            src="https://cdn.emailjs.com/dist/email.min.js"
        />,
        <script
            async
            key="emailjs-initialize"
            type="text/javascript"
            dangerouslySetInnerHTML={{
                __html: '(function(){emailjs.init("user_miNvmuNB4AxQqC3Ebfu5K");})();'
            }}
        />
    ]);
