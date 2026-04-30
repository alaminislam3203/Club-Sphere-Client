import React from 'react';

const Container = ({ children }) => {
  return (
    <div className="container mx-auto px-3 md:px-10 xl:px-15 ">{children}</div>
  );
};

export default Container;
