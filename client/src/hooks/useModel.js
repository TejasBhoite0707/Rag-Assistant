import { useCallback, useState } from "react";

const useModal = (initialValue = false) => {

    const [isOpen, setIsOpen] = useState(initialValue);

    const openModal = useCallback(() => {
        setIsOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsOpen(false);
    }, []);

    const toggleModal = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    return {
        isOpen,
        openModal,
        closeModal,
        toggleModal
    };
};

export default useModal;