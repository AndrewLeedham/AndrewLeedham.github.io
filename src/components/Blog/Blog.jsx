import React, { useEffect, useState } from 'react';
import blogStyles from './Blog.module.css';
import useDebounce from '../../library/useDebounce';
import fuzzysearch from 'fuzzysearch';
import Close from '../../images/icons/close.svg';
import { useStaticQuery, graphql } from 'gatsby';

// const posts = [
//   {
//     title: 'My time at Xerox',
//     tags: ['professional', 'work'],
//     date: '27/1/19',
//     datetime: '27-1-19'
//   },
//   {
//     title: 'Gullet - Gulp’s missing interface',
//     tags: ['university', 'work'],
//     date: '12/6/17',
//     datetime: '12-6-17'
//   },
//   {
//     title: 'Contributions',
//     tags: ['oss', 'work'],
//     date: '19/12/18',
//     datetime: '19/-2-18'
//   },
//   {
//     title: 'wordpress-rest-api-extended',
//     tags: ['oss', 'work'],
//     date: '3/6/18',
//     datetime: '3-6-18'
//   },
//   {
//     title: 'gulp-http2-push-manifest',
//     tags: ['oss', 'work'],
//     date: '11/5/18',
//     datetime: '11-5-18'
//   },
//   {
//     title: 'Syntax highlighters',
//     tags: ['oss', 'work'],
//     date: '3/6/18',
//     datetime: '3-6-18'
//   },
//   {
//     title: '3d Text Generator',
//     tags: ['oss', 'work'],
//     date: '20/2/17',
//     datetime: '20-2-17'
//   },
//   {
//     title: 'eightbit',
//     tags: ['gamedev', 'work'],
//     date: '24/1/16',
//     datetime: '24-1-16'
//   }
// ];

const tags = {
  update: '#b757ce',
  oss: '#57cece',
  professional: '#2e88b0',
  university: '#ce5777',
  gamedev: '#c9a73e'
};

const tagRegex = /(.*)\btags:(\w+(?:,\w+)*)(.*)/i;

function filterPosts(posts, filter) {
  const [, start = undefined, tags = '', end = undefined] =
    filter.match(tagRegex) || [];
  const tagFilters = tags.split(',').filter((tag) => !!tag);
  return posts.filter(({ node: { frontmatter: post } }) => {
    if (tagFilters.length) {
      return (
        tagFilters.every((tagFilter) => post.tags.includes(tagFilter)) &&
        fuzzysearch((start + end).replace(/\s/g, ''), post.title)
      );
    } else {
      return fuzzysearch(filter.replace(/\s/g, ''), post.title);
    }
  });
}

function addTag(filter, tag) {
  const [, start = '', tags = '', end = ''] = filter.match(tagRegex) || [];
  if (
    !tags
      .split(',')
      .filter((tag) => !!tag)
      .includes(tag)
  ) {
    const tagString = tags ? tags + ',' + tag : tag;
    const startString = !start || start.endsWith(' ') ? start : start + ' ';
    return startString + 'tags:' + tagString + end;
  } else {
    return filter;
  }
}

const Blog = () => {
  const {
    allMarkdownRemark: { edges: posts }
  } = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                datetime: date
                date(formatString: "DD/M/YYYY")
                tags
              }
            }
          }
        }
      }
    `
  );
  const [filter, setFilter] = useState('');
  const debouncedFilter = useDebounce(filter, 100);
  const [filteredPosts, setFilteredPosts] = useState(posts);

  useEffect(() => {
    if (debouncedFilter) {
      const filtered = filterPosts(posts, debouncedFilter);
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  });
  return (
    <div className={blogStyles.blog}>
      <h2 className={blogStyles.subtitle}>Blog</h2>
      <div className={blogStyles.filter}>
        <input
          type="text"
          placeholder="Search/filter"
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
        />
        <Close onClick={() => setFilter('')} />
      </div>
      <ul className={blogStyles.posts}>
        {filteredPosts.map(
          ({
            node: {
              frontmatter: post,
              fields: { slug: url }
            }
          }) => (
            <li className={blogStyles.post}>
              <div>
                <a className={blogStyles.post__title} href={url}>
                  {post.title}
                </a>
                {post.tags &&
                  post.tags.map((tag) => (
                    <>
                      {' '}
                      <span
                        className={blogStyles.post__tag}
                        style={{
                          backgroundColor: tags[tag]
                        }}
                        onClick={(e) =>
                          setFilter(addTag(filter, e.target.innerText.trim()))
                        }
                      >
                        {tag}
                      </span>
                    </>
                  ))}
              </div>
              <time className={blogStyles.post__date} dateTime={post.datetime}>
                {post.date}
              </time>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default Blog;
