import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../../components/Layout';
import SEO from '../../components/SEO';
import Stacked from '../../components/Stacked';
import postStyles from './BlogPostTemplate.module.css';
import Logo from '../../images/logo-small.svg';

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;
    const siteTitle = this.props.data.site.siteMetadata.title;
    const { previous, next } = this.props.pageContext;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <Stacked>
          <a className={postStyles.logo} href="/">
            <Logo />
          </a>
          <header>
            <h1 className={postStyles.title}>{post.frontmatter.title}</h1>
            <time
              className={postStyles.date}
              dateTime={post.frontmatter.datetime}
            >
              {post.frontmatter.date}
            </time>
            <hr />
          </header>
          <div
            className={postStyles.post}
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
          <footer>
            <hr />

            <ul
              style={{
                display: `flex`,
                flexWrap: `wrap`,
                justifyContent: `space-between`,
                listStyle: `none`,
                padding: 0
              }}
            >
              <li>
                {previous && (
                  <Link to={previous.fields.slug} rel="prev">
                    ← {previous.frontmatter.title}
                  </Link>
                )}
              </li>
              <li>
                {next && (
                  <Link to={next.fields.slug} rel="next">
                    {next.frontmatter.title} →
                  </Link>
                )}
              </li>
            </ul>
          </footer>
        </Stacked>
      </Layout>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        datetime: date
        date(formatString: "DD/M/YYYY")
        description
      }
    }
  }
`;
