const request = {
    places: "/places",
    usersPlaces: "/users/places",
    postUserPlace: "/users/places",
    deleteUserPlace: (id: string) => `/users/places/${id}`,
};

export default request;
