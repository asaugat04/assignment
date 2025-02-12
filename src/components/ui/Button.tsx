const Button: React.FC<{
  children: string | React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}> = ({ children, variant = "primary", size = "md", className }) => {
  const baseStyles =
    "rounded-md font-medium transition duration-200 ease-in-out focus:outline-none";

  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    outline: "border border-gray-600 text-gray-600 hover:bg-gray-100",
  };

  const sizeStyles = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
    xl: "px-6 py-4 text-xl",
  };

  return (
    <button
      className={`flex items-center ${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className} `}
    >
      {children}
    </button>
  );
};

export default Button;
