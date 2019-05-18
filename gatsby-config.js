module.exports = {
  siteMetadata: {
    title: `Andrew Leedham: Front-end Web Developer`,
    description: `Andrew Leedham's personal blog.`,
    author: `Andrew Leedham`,
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
        name: `Andrew Leedham's Blog`,
        short_name: `ALBlog`,
        start_url: `/`,
        background_color: `#2c7d6b`,
        theme_color: `#2c7d6b`,
        display: `minimal-ui`,
        icon: `src/images/al_logo-small.svg`
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
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/src/blog`
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`
        ]
      }
    }
  ]
};
