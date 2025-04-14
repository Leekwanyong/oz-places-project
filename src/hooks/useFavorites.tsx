import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserPlace, postUserPlace } from "../api/getPlaces";

function useFavorites() {
    const queryClient = useQueryClient();

    const addToFavorites = useMutation({
        mutationFn: postUserPlace,
        onSuccess: () => {
            console.log("성공적으로 찜 목록에 추가되었습니다!");
            queryClient.invalidateQueries({ queryKey: ["userPlaces"] });
        },
        onError: (error) => {
            console.error("찜 목록 추가 실패:", error);
        },
    });

    const removeFromFavorites = useMutation({
        mutationFn: deleteUserPlace,
        onSuccess: () => {
            console.log("성공적으로 찜 목록에서 제거되었습니다!");
            queryClient.invalidateQueries({ queryKey: ["userPlaces"] });
        },
        onError: (error) => {
            console.error("찜 목록 제거 실패:", error);
        },
    });

    return { addToFavorites, removeFromFavorites };
}

export default useFavorites;
