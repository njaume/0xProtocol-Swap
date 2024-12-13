import { ButtonHTMLAttributes } from "react";

const Button = ({children, ...props}: ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button {...props} className="w-full border-0 bg-black rounded-[40px] px-20 py-4 text-4xl text-white hover:bg-blue-600 hover:text-3xl transition-all duration-200">
            {children}
        </button>
    );
};

export default Button;