import type { PlacesResponse } from "../ts/apiType";
import { useMemo } from "react";
import { sortPlacesByDistance } from "../utils/loc";
import Modal from "./Modal";
import useFavorites from "../hooks/useFavorites";
import useModalState from "../hooks/useModalState";
import useUserLocation from "../hooks/useUserLocation";

interface CardProps {
    data: PlacesResponse | undefined;
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
    currentView: "normal" | "favorite";
}

const BASE_URL = "http://localhost:3000";

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
                        <li key={place.id} className="flex flex-col items-center justify-between">
                            <img
                                src={`${BASE_URL}/${place.image.src}`}
                                alt={place.image.alt}
                                className="object-cover w-full h-[200px]"
                                width={300}
                                height={300}
                            />
                            <div className="p-3 flex flex-col gap-2">
                                <h3 className="font-semibold text-lg">{place.title}</h3>
                                <button
                                    className={`bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded`}
                                    onClick={() => {
                                        if (currentView === "normal") {
                                            addToFavorites.mutate(place);
                                        } else {
                                            handleOpen();
                                            setSelectedId(place.id);
                                        }
                                    }}
                                >
                                    {currentView === "normal" ? "찜하기" : "찜 해제"}
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </article>
        </section>
    );
}

export default Card;
