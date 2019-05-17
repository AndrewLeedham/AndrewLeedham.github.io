import React from 'react';
import splitStyles from './Split.module.css';

const Split = ({ children }) => (
  <div className={splitStyles.split}>
    {children.map((child, index) => (
      <div className={splitStyles.panel} key={index}>
        {child}
      </div>
    ))}
  </div>
);

export default Split;
