// @flow
import React from 'react';
import {TypographyStyle} from 'react-typography';
import logo from '../static/images/logo.png';
import typography from './utils/typography';

type Props = {
    headComponents: any,
    body: any,
    postBodyComponents: any
};

export default (props: Props) => (
    <html lang="en">
        <head>
            <link
                rel="preload"
                href="/static/space-mono-latin-700.eadcd2d5.woff2"
                as="font"
                crossOrigin
            />
            <link
                rel="preload"
                href="/static/space-mono-latin-400.a8338881.woff2"
                as="font"
                crossOrigin
            />
            {props.headComponents}
            <meta charSet="utf-8" />
            <meta name="description" content="Helianthus: Cátia Canastro's photography website" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <link rel="icon" type="image/png" href={logo} />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Helianthus</title>
            <TypographyStyle typography={typography} />
        </head>
        <body>
            <div id="___gatsby" dangerouslySetInnerHTML={{__html: props.body}} />
            <script type="text/javascript" src="https://cdn.emailjs.com/dist/email.min.js"></script>
            <script type="text/javascript">
                (function() {
                    emailjs.init('user_miNvmuNB4AxQqC3Ebfu5K');
                })();
            </script>

            {props.postBodyComponents}
        </body>
    </html>
);
