import React from 'react';
import EmailIcon from '../../images/icons/email.svg';
import GithubIcon from '../../images/icons/github.svg';
import InstagramIcon from '../../images/icons/instagram.svg';
import LinkedinIcon from '../../images/icons/linkedin.svg';
import StackOverflowIcon from '../../images/icons/stackoverflow.svg';
import TwitterIcon from '../../images/icons/twitter.svg';

import iconStyles from './Icons.module.css';

const Icons = {
  email: () => (
    <EmailIcon
      role="img"
      className={[iconStyles.icon, iconStyles.social].join(' ')}
    />
  ),
  github: () => (
    <GithubIcon
      role="img"
      className={[iconStyles.icon, iconStyles.social].join(' ')}
    />
  ),
  instagram: () => (
    <InstagramIcon
      role="img"
      className={[iconStyles.icon, iconStyles.social].join(' ')}
    />
  ),
  linkedin: () => (
    <LinkedinIcon
      role="img"
      className={[iconStyles.icon, iconStyles.social].join(' ')}
    />
  ),
  stackoverflow: () => (
    <StackOverflowIcon
      role="img"
      className={[iconStyles.icon, iconStyles.social].join(' ')}
    />
  ),
  twitter: () => (
    <TwitterIcon
      role="img"
      className={[iconStyles.icon, iconStyles.social].join(' ')}
    />
  )
};

export default Icons;
