const Button: React.FC<{ type: string }> = ({ children, type }) => {
  return <button className={`btn btn--${type}`}>{children}</button>;
};

export default Button;
