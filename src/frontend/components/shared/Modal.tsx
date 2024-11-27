export const Modal = ({modalId, children} : {modalId: string, children: React.ReactNode}) => {
    return (
        <>
            <input type="checkbox" id={modalId} className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box bg-white">
                    {children}
                    <div className="modal-action">
                        <label htmlFor={modalId} className="btn">
                            Close!
                        </label>
                    </div>
                </div>
                <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
            </div>
        </>
    );
};
