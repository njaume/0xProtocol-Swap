import { toast } from "sonner";

export const handleError = (error: any) => {
 const errorMessage = error?.data?.details && error?.data?.details[0]?.reason || error?.message;
 console.error("errorMessage", errorMessage);
 toast.error(errorMessage);
 return;
};