module.exports = {
    siteMetadata: {
        title: 'Flashback'
    },
    plugins: [
        'gatsby-transformer-remark',
        'gatsby-plugin-sharp',
        'gatsby-transformer-sharp',
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-offline',
        {
            resolve: 'gatsby-plugin-typography',
            options: {
                pathToConfigModule: 'src/utils/typography'
            }
        },
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                name: 'Flashback',
                short_name: 'Flashback',
                start_url: '/',
                background_color: '#f7f7f7',
                theme_color: '#191919',
                display: 'minimal-ui',
                icons: [
                    {
                        src: '/favicons/camera-192x192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: '/favicons/camera-512x512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    }
                ]
            }
        },
        {
            resolve: 'gatsby-plugin-google-analytics',
            options: {
                trackingId: 'UA-111368026-1'
            }
        },
        {
            resolve: 'gatsby-source-contentful',
            options: {
                spaceId: 'n304sk2sx2c2',
                accessToken:
          '9b72f183a20c20de197bcdf5818f41c742a164eff7dc20f32324ccded7bf00a9'
            }
        }
    ]
};
