import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Icons from '../../images/icons';
import socialStyles from './Social.module.css';

const Social = () => (
  <StaticQuery
    query={graphql`
      query SocialQuery {
        site {
          siteMetadata {
            social {
              name
              icon
              url
            }
          }
        }
      }
    `}
    render={(data) => (
      <ul className={socialStyles.social}>
        {data.site.siteMetadata.social.map((social) => {
          const Icon = Icons[social.icon];
          return (
            <li>
              <a href={social.url} aria-label={social.name}>
                <Icon />
              </a>
            </li>
          );
        })}
      </ul>
    )}
  />
);
export default Social;
