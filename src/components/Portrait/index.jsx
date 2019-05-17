import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import portraitStyles from './Portrait.module.css';

const Portrait = () => (
  <StaticQuery
    query={graphql`
      query {
        placeholderImage: file(relativePath: { eq: "portrait.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 250) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `}
    render={(data) => (
      <div className={portraitStyles.portrait}>
        <div className={portraitStyles.portrait__wrapper}>
          <Img
            fluid={data.placeholderImage.childImageSharp.fluid}
            imgStyle={{
              top: '3%',
              left: '3%',
              width: '94%',
              height: '94%',
              borderRadius: '100%',
              WebkitClipPath: 'inset(0 0 16% 0)',
              clipPath: 'inset(0 0 16% 0)',
              margin: 0
            }}
          />
        </div>
      </div>
    )}
  />
);
export default Portrait;
