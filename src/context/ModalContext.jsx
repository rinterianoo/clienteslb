import { createContext, useContext, useState } from 'react';
const ModalContext = createContext();
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal debe ser usado dentro de ModalProvider');
  }
  return context;
};
export function ModalProvider({ children }) {
  const [activeModals, setActiveModals] = useState(new Set());
  const openModal = (modalId) => {
    setActiveModals(prev => new Set([...prev, modalId]));
  };
  const closeModal = (modalId) => {
    setActiveModals(prev => {
      const newSet = new Set(prev);
      newSet.delete(modalId);
      return newSet;
    });
  };
  const isModalOpen = (modalId) => {
    return activeModals.has(modalId);
  };
  const hasAnyModalOpen = () => {
    return activeModals.size > 0;
  };
  const value = {
    openModal,
    closeModal,
    isModalOpen,
    hasAnyModalOpen,
    activeModals: Array.from(activeModals)
  };
  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
}
