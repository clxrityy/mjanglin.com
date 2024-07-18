import { create } from "zustand";

export type ModalType = "delete";

interface ModalStore {
    type: ModalType | null;
    data: ModalData;
    isOpen: boolean;
    onOpen: (type: ModalType, data: ModalData) => void;
    onClose: () => void;
}

interface ModalData {
    value?: number;
    date?: Date;
}

export const useModal = create<ModalStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data) => set({ type, data, isOpen: true }),
    onClose: () => set({ type: null, data: {}, isOpen: false })
}))