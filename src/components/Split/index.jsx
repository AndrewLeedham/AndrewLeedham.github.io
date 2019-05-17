import React from 'react';
import splitStyles from './Split.module.css';

const Split = ({ children }) => (
  <div className={splitStyles.split}>
    {children.map((child) => (
      <div className={splitStyles.panel}>{child}</div>
    ))}
  </div>
);

export default Split;
