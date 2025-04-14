import type { Place } from "../ts/apiType";

type CardListProps = {
    place: Place;
    currentView: "normal" | "favorite";
    addToFavorites: (place: Place) => void;
    removeFromFavorites: (id: string) => void;
    isOpen: boolean;
    handleOpen: () => void;
    setSelectedId: (id: string) => void;
    handleRemove: () => void;
};

const BASE_URL = "http://localhost:3000";
function CardList({ place, currentView, addToFavorites, handleOpen, setSelectedId }: CardListProps) {
    return (
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
                            addToFavorites(place);
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
    );
}

export default CardList;
