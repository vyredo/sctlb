import React from "react";
import "./Button.css";

interface Props {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  async?: boolean;
}

export const Button: React.FC<Props> = ({ children, className, onClick, disabled, async }) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClick = async () => {
    if (async) {
      setIsLoading(true);
      await onClick?.();
      setIsLoading(false);
    } else {
      onClick?.();
    }
  };

  return (
    <button className={`button ${className}  ${disabled ? "disabled" : ""}`} onClick={handleClick}>
      {isLoading && <div className="loader"></div>}
      {!isLoading && children}
    </button>
  );
};
