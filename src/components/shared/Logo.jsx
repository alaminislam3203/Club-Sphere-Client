import React from 'react';
import siteLogo from '../../assets/logo/logo.png';

const logo = () => {
  return (
    <div className="flex items-center gap-1">
      <figure className="w-8">
        <img src={siteLogo} alt="Site Logo" />
      </figure>
    </div>
  );
};

export default logo;
