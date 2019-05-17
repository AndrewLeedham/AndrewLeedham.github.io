module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
    social: [
      {
        name: 'Email',
        icon: 'email',
        url: 'mailto:AndrewLeedham@Outlook.com'
      },
      {
        name: 'GitHub',
        icon: 'github',
        url: 'https://www.github.com/AndrewLeedham'
      },
      {
        name: 'Instagram',
        icon: 'instagram',
        url: 'https://www.instagram.com/andrew_leedham/'
      },
      {
        name: 'Linked In',
        icon: 'linkedin',
        url: 'https://www.linkedin.com/in/andrew-leedham-ba864b112/'
      },
      {
        name: 'Stack Overflow',
        icon: 'stackoverflow',
        url: 'http://stackoverflow.com/users/2386508/andrew-leedham'
      }
    ]
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: `gatsby-transformer-sharp`,
      options: {}
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        useMozJpeg: true,
        stripMetadata: true,
        defaultQuality: 75
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`
        // icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      }
    },
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        rule: {
          include: /\.svg$/
        }
      }
    },
    `gatsby-plugin-offline`
  ]
};
