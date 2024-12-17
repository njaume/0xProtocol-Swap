import Image from "next/image";
import { TxStatus } from "../../hooks/use0xStatus";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

const Status = ({ status = TxStatus.Confirmed }: { status: TxStatus }) => {
    switch (status) {
        case TxStatus.Pending:
            return (
                <div className="w-full flex items-center flex-col justify-center text-center">
                    <span className="loading loading-ring w-[100px] h-[100px]"></span>

                    <p className="text-4xl text-black font-normal mt-9">
                        Your <span className="font-semibold italic">Swap</span>{" "}
                        is in progress...
                    </p>
                </div>
            );
        case TxStatus.Confirmed:
            return (
                <div className="w-full flex items-center flex-col justify-center text-center">
                    <Image
                        src="/check.svg"
                        alt="finalized"
                        width={100}
                        height={100}
                    />
                    <p className="text-4xl text-black font-normal mt-9">
                        Your <span className="font-semibold italic">Swap</span>{" "}
                        has been completed!
                    </p>
                </div>
            );
        case TxStatus.Failed:
            return (
                <div className="w-full flex items-center flex-col justify-center text-center">
                    <ExclamationCircleIcon width={100} height={100} className="text-black" />
                    <p className="text-4xl text-black font-normal mt-9">
                        Your <span className="font-semibold italic">Swap</span>{" "}
                        has failed.
                    </p>
                </div>
            );
        default:
            return null;
    }
};

export default Status;
