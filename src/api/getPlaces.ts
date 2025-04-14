import {Place, PlacesResponse} from "../ts/apiType";
import instance from "./instace";
import request from "./requst";

export const getPlaces = async (): Promise<PlacesResponse> => {
    return await instance(request.places);
};

export const getUserPlaces = async () => {
    return await instance(request.usersPlaces);
};

export const postUserPlace = async (place?: Place) => {
    return await instance(request.postUserPlace, {
        method: "POST",
        body: {place},
    });
};

export const deleteUserPlace = async (id: string) => {
    return await instance(request.deleteUserPlace(id), {
        method: "DELETE",
    });
};
