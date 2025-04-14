import type { PlacesResponse } from "../ts/apiType";
import { useMemo } from "react";
import { sortPlacesByDistance } from "../utils/loc";
import Modal from "./Modal";
import useFavorites from "../hooks/useFavorites";
import useModalState from "../hooks/useModalState";
import useUserLocation from "../hooks/useUserLocation";
import CardList from "./CardList";

interface CardProps {
    data: PlacesResponse | undefined;
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
    currentView: "normal" | "favorite";
}

function Card({ data, isLoading, isError, error, currentView }: CardProps) {
    const { addToFavorites, removeFromFavorites } = useFavorites();
    const { isOpen, setSelectedId, handleOpen, handleRemove } = useModalState(removeFromFavorites);
    const { userLocation } = useUserLocation();

    const sortPlacesDistance = useMemo(() => {
        if (!userLocation) return data?.places;
        return sortPlacesByDistance(data?.places, userLocation.userLat, userLocation.userLng);
    }, [data?.places, userLocation]);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error?.message}</div>;
    if (!data) return <div>No data</div>;

    if (isOpen) return <Modal open={isOpen} onClose={handleOpen} onConfirm={handleRemove} />;

    return (
        <section>
            <article>
                <h2 className="text-2xl font-bold text-center mb-8">
                    {currentView === "normal" ? "맛집 목록" : "찜 목록"}
                </h2>
                <ul className="max-w-[80rem] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {sortPlacesDistance?.map((place) => (
                        <CardList
                            key={place.id}
                            place={place}
                            currentView={currentView}
                            addToFavorites={addToFavorites.mutate}
                            removeFromFavorites={removeFromFavorites.mutate}
                            isOpen={isOpen}
                            setSelectedId={setSelectedId}
                            handleOpen={handleOpen}
                            handleRemove={handleRemove}
                        />
                    ))}
                </ul>
            </article>
        </section>
    );
}

export default Card;
