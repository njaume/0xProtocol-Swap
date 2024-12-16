import { toast } from "sonner";

function normalizeErrorMessage(error: string): string {
    if (error?.includes("User denied transaction signature")) {
        return "Transaction rejected by user.";
    }

    if (error?.includes("User rejected the request")) {
        return "Request rejected by user.";
    }
    return error;
}

export const handleError = (error: any) => {
    const errorMessage =
        (error?.data?.details && error?.data?.details[0]?.reason) ||
        error?.message;
    console.error("errorMessage", errorMessage);
    toast.error(normalizeErrorMessage(errorMessage));
    return;
};
