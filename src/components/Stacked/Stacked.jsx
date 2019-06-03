import React from 'react';
import stackedStyles from './Stacked.module.css';

const Stacked = ({ children }) => (
  <div className={stackedStyles.stacked}>{children}</div>
);

export default Stacked;
