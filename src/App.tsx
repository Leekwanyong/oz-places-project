import { useQuery } from "@tanstack/react-query";
import { getPlaces, getUserPlaces } from "./api/getPlaces";
import Card from "./components/Card";

function App() {
    const getPlacesQuery = useQuery({
        queryKey: ["places"],
        queryFn: getPlaces,
    });

    const getUserPlacesQuery = useQuery({
        queryKey: ["userPlaces"],
        queryFn: getUserPlaces,
    });

    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
            <Card
                data={getUserPlacesQuery.data ?? undefined}
                isLoading={getUserPlacesQuery.isLoading}
                isError={getUserPlacesQuery.isError}
                error={getUserPlacesQuery.error}
                currentView="favorite"
            />
            <Card
                data={getPlacesQuery.data ?? undefined}
                isLoading={getPlacesQuery.isLoading}
                isError={getPlacesQuery.isError}
                error={getPlacesQuery.error}
                currentView="normal"
            />
        </main>
    );
}

export default App;
