const Button: React.FC<{ type: string }> = ({ children, type }) => {
  return <button className={type}>{children}</button>;
};

export default Button;
