
export const useModal = (modalId: string) => {
 const openModal = () => document.getElementById(modalId).checked = true;
 const closeModal = () => document.getElementById(modalId).checked = false;
 return {
  openModal,
  closeModal
 };
};