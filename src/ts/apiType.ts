export interface PlaceImage {
    src: string;
    alt: string;
}

export interface Place {
    id: string;
    description: string;
    title: string;
    image: PlaceImage;
    lat: number;
    lon: number;
}

export interface PlacesResponse {
    places: Place[];
}
