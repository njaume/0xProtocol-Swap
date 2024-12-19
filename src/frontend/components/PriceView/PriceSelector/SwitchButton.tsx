import Image from "next/image";

const SwitchButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-2">
            <button
                onClick={onClick}
                className="rounded-full flex items-center justify-center box-content w-[74px] h-[74px] bg-[#F4F4F5] hover:bg-gray-200 text-white border-[8px] border-white group transition-all duration-500"
            >
                <div className="flex gap-[5px]">
                    {/* Flecha hacia abajo */}
                    <Image
                        src="/arrow-down-black.svg" // Usamos el mismo archivo SVG
                        alt="Swap"
                        width={15}
                        height={30}
                        className="mt-2 filter group-hover:invert group-hover:brightness-200 transition-all duration-300"
                    />
                    {/* Flecha hacia arriba */}
                    <Image
                        src="/arrow-down-black.svg" // Usamos el mismo archivo SVG
                        alt="Swap"
                        width={15}
                        height={30}
                        className="mb-2 transform rotate-180 filter brightness-200 invert group-hover:invert-0 group-hover:brightness-100 transition-all duration-300"
                    />
                </div>
            </button>
        </div>
    );
};

export default SwitchButton;
