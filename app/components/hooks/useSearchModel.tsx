import {create} from 'zustand'

interface useSearchModelStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;

}


const useSearchModel =create<useSearchModelStore> ((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true}),
    onClose: () => set({isOpen: false}),
})) ;


export default useSearchModel