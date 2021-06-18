import React from 'react';

const alert = ({ children, ...props }: React.HTMLProps<HTMLDivElement>) => {
  return <p {...props}>{children}</p>;
};

export default alert;
