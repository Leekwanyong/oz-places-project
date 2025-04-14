import React from "react";

function Modal({ open, onClose, onConfirm }: { open: boolean; onClose: () => void; onConfirm: () => void }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
            <div className="bg-white p-4 rounded-lg" onClick={(e) => e.stopPropagation()}>
                <p>정말 삭제하시겠습니까?</p>
                <div className="flex gap-4 justify-end mt-4">
                    <button className="px-3 py-1 bg-gray-200 rounded" onClick={onClose}>
                        취소
                    </button>
                    <button className="px-3 py-1 bg-red-500 text-white rounded" onClick={onConfirm}>
                        삭제
                    </button>
                </div>
            </div>
        </div>
    );
}

export default React.memo(Modal);
