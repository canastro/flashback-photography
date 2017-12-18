import React from 'react';

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
