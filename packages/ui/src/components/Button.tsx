import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

const Button = ({ variant = "primary", children, ...props }: ButtonProps) => {
  const base = "px-4 py-2 rounded font-semibold";
  const style =
    variant === "primary" ? "bg-blue-600 text-white" : "bg-gray-200 text-black";

  return (
    <button className={`${base} ${style}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
