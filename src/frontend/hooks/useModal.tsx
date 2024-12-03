export const useModal = (modalId: string) => {
 const openModal = () => {
   const modal = document?.getElementById(modalId) as HTMLInputElement | null;
   if (modal) {
     modal.checked = true;
   }
 };

 const closeModal = () => {
   const modal = document?.getElementById(modalId) as HTMLInputElement | null;
   if (modal) {
     modal.checked = false;
   }
 };

 return {
   openModal,
   closeModal,
 };
};
