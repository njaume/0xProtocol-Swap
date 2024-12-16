import Image from "next/image";
import { use0x } from "../../hooks/use0x";
import Button from "../Button";

export default function FinalizedView() {
    const { dispatch } = use0x();
    const handleClick = () => {
        dispatch({
            type: "SET_FINALIZED",
            payload: false,
        });
    };
    return (
        <div className="w-full flex items-center flex-col justify-center text-center">
            <Image src="/check.svg" alt="finalized" width={100} height={100} />
            <p className="text-4xl text-black font-normal mt-9">
                Your <span className="font-semibold italic">Swap</span> has been
                completed!
            </p>
            <div className="mt-[124px] w-full">
                <Button onClick={handleClick}>Back to home</Button>
            </div>
        </div>
    );
}
