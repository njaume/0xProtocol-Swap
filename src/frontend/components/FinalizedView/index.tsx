import { use0x } from "../../hooks/use0x";
import Button from "../Button";
import { use0xStatus } from "../../hooks/use0xStatus";
import Status from "./Status";

export default function FinalizedView() {
    const { dispatch, swapTxHash, state, chainId } = use0x();
    const { status } = use0xStatus({
        txHash: swapTxHash,
        isNative: state.isNativeToken,
        chainId: chainId,
    });

    const handleClick = () => {
        dispatch({
            type: "SET_FINALIZED",
            payload: false,
        });
    };
    return (
        <div className="w-full flex items-center flex-col justify-center text-center">
            <Status status={status} />
            <div className="mt-[124px] w-full">
                <Button onClick={handleClick}>Back to home</Button>
            </div>
        </div>
    );
}
