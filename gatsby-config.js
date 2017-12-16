module.exports = {
    siteMetadata: {
        title: 'Helianthus'
    },
    plugins: [
        'gatsby-transformer-remark',
        // This plugin exposes helper functions for processing
        // images with the NPM package “sharp”. It's used by
        // several other plugins.
        'gatsby-plugin-sharp',
        // This plugin identifies file nodes that are images and
        // transforms these to create new “ImageSharp” nodes.
        // With them you can resize images and
        // generate responsive image thumbnails.
        'gatsby-transformer-sharp',
        // This plugin transforms JSON file nodes.
        'gatsby-transformer-json',
        // This plugin takes your configuration and generates a
        // web manifest file so Gatsbygram can be added to your
        // homescreen on Android.
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                name: 'Helianthus',
                short_name: 'Helianthus',
                start_url: '/',
                background_color: '#f7f7f7',
                theme_color: '#191919',
                display: 'minimal-ui'
            }
        },
        // This plugin generates a service worker and AppShell
        // html file so the site works offline and is otherwise
        // resistant to bad networks. Works with almost any
        // site!
        'gatsby-plugin-offline',
        // This plugin sets up Google Analytics for you.
        {
            resolve: 'gatsby-plugin-google-analytics',
            options: {
                trackingId: 'UA-91652198-1'
            }
        },
        {
            resolve: 'gatsby-source-contentful',
            options: {
                spaceId: 'n304sk2sx2c2',
                accessToken: '9b72f183a20c20de197bcdf5818f41c742a164eff7dc20f32324ccded7bf00a9'
            }
        }
    ]
};
