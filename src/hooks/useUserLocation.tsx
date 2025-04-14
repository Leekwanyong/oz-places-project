import { useQuery } from "@tanstack/react-query";
import getLocation from "../utils/Geolocation";

function useUserLocation() {
    const query = useQuery({
        queryKey: ["userLocation"],
        queryFn: () => getLocation(),
        staleTime: 1000 * 60 * 5,
        retry: false,
    });

    if (query.isLoading) return { userLocation: null, isLoading: true, error: null };
    if (query.error) return { userLocation: null, isLoading: false, error: query.error };

    return { userLocation: query.data };
}

export default useUserLocation;
