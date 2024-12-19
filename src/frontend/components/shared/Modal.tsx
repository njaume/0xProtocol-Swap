import { XMarkIcon } from "@heroicons/react/24/solid";

export const Modal = ({
    modalId,
    children,
}: {
    modalId: string;
    children: React.ReactNode;
}) => {
    return (
        <>
            <input type="checkbox" id={modalId} className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box bg-white">
                    {children}
                    <div className="modal-action absolute top-0 right-4 text-2xl text-black">
                        <label htmlFor={modalId} className="">
                            <XMarkIcon
                                width={20}
                                height={20}
                                className="fill-black text-black cursor-pointer"
                            />
                        </label>
                    </div>
                </div>
                <label className="modal-backdrop" htmlFor="my_modal_7">
                    Close
                </label>
            </div>
        </>
    );
};
