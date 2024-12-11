import Image from "next/image";
import { ConnectButtonCustom } from "./ConnectButton";
import ZeroExLogo from "../images/white-0x-logo.png";

export const PriceViewHeader = () => {
    return (
        <header className="flex items-center justify-between">
            <a href="https://0x.org/" target="_blank" rel="noopener noreferrer">
                <div className="flex items-center">
                    <Image
                        src={ZeroExLogo}
                        alt="0x Logo"
                        width={50}
                        height={50}
                    />
                    <h2 className="text-lg text-black font-light">Swap</h2>
                </div>
            </a>
            <ConnectButtonCustom />
        </header>
    );
};
