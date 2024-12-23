import classNames from "classnames";
import { ButtonHTMLAttributes } from "react";

const Button = ({
    children,
    loading,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) => {
    return (
        <button
            {...props}
            className={classNames(
                "w-full border-0 bg-black rounded-[40px] px-8 py-3 md:px-20 md:py-4 text-xl md:text-4xl text-white hover:bg-black/75 transition-all duration-200 disabled:bg-white disabled:text-[#E4E4E7] disabled:border-[3px] disabled:border-[#E4E4E7]",
                {
                    "cursor-not-allowed text-gray-400 bg-gradient-to-r from-black via-gray-500 to-black bg-[length:200%_200%] animate-shimmer focus:outline-none":
                        loading,
                }
            )}
        >
            {!loading ? children : "Loading..."}
        </button>
    );
};

export default Button;
