import PropTypes from 'prop-types';
import React from 'react';
import Portrait from '../Portrait';
import Logo from '../../images/al_logo-large.svg';
import headerStyles from './Header.module.css';
import Social from '../Social';

const Header = () => (
  <header className={headerStyles.header}>
    <Portrait />
    <Logo className={headerStyles.logo} />
    <h1 className={headerStyles.title}>Front-end Web Developer</h1>
    <Social />
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string
};

Header.defaultProps = {
  siteTitle: ``
};

export default Header;
