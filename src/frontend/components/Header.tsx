import Image from "next/image";
import { ConnectButtonCustom } from "./ConnectButton";

export const PriceViewHeader = () => {
    return (
        <header className="flex items-center justify-between ml-5">
            <a href="https://0x.org/" target="_blank" rel="noopener noreferrer">
                <div className="flex items-end gap-2">
                    <Image
                        src={"logo-0x.svg"}
                        alt="0x Logo"
                        width={56}
                        height={56}
                    />
                    <span className="text-3xl text-black font-light leading-none">Swap</span>
                </div>
            </a>
            <ConnectButtonCustom />
        </header>
    );
};
