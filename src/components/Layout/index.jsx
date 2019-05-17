/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';

import 'normalize.css';
import './Layout.module.css';

const Layout = ({ children }) => <main>{children}</main>;

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
