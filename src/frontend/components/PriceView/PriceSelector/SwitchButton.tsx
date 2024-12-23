import Image from "next/image";

const SwitchButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-1 md:gap-2">
            <button
                onClick={onClick}
                className="rounded-full flex items-center justify-center box-content w-[50px] h-[50px] md:w-[74px] md:h-[74px] bg-[#F4F4F5] hover:bg-gray-200 text-white border-[6px] md:border-[8px] border-white group transition-all duration-500"
            >
                <div className="flex gap-[3px] md:gap-[5px]">
                    {/* Downward arrow */}
                    <Image
                        src="/arrow-down-black.svg"
                        alt="Swap"
                        width={12}
                        height={24}
                        className="mt-1 md:mt-2 filter group-hover:invert group-hover:brightness-200 transition-all duration-300"
                    />
                    {/* Upward arrow */}
                    <Image
                        src="/arrow-down-black.svg"
                        alt="Swap"
                        width={12}
                        height={24}
                        className="mb-1 md:mb-2 transform rotate-180 filter brightness-200 invert group-hover:invert-0 group-hover:brightness-100 transition-all duration-300"
                    />
                </div>
            </button>
        </div>
    );
};

export default SwitchButton;
