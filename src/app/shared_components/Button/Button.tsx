import React from "react";
import "./Button.scss";
import { Spinner } from "@/assets/Spinner/Spinner";

interface Props {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  async?: boolean;
  type?: "primary" | "secondary";
}

export const Button: React.FC<Props> = ({ children, className, onClick, disabled, async, type }) => {
  let btnType = type ?? "primary";
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

  if (btnType === "primary") {
    className += " primary";
  } else if (btnType === "secondary") {
    className += " secondary";
  }

  return (
    <button className={`sctlb-button ${className}  ${disabled ? "disabled" : ""}`} onClick={handleClick}>
      {isLoading && <Spinner />}
      {!isLoading && children}
    </button>
  );
};
