import { UseMutationResult } from "@tanstack/react-query";
import { useCallback, useState } from "react";

function useModalState(onRemove: UseMutationResult<number, Error, string, unknown>) {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleOpen = useCallback(() => {
        setIsOpen((prev) => !prev);
        setSelectedId(null);
    }, []);

    const handleRemove = useCallback(() => {
        if (selectedId) {
            onRemove.mutate(selectedId);
            setSelectedId(null);
            handleOpen();
        }
    }, [selectedId, onRemove, handleOpen]);

    return { isOpen, setIsOpen, selectedId, setSelectedId, handleOpen, handleRemove };
}

export default useModalState;
