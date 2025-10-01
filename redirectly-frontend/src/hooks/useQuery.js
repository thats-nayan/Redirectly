import { useQuery } from "react-query"
import api from "../api/api";

export const useFetchTotalClicks = (token , onError) => {
    return useQuery("url-totalclick", 
        async ()=>{
            // Calculate last 1 month
            const endDate = new Date();
            const startDate = new Date();
            startDate.setMonth(startDate.getMonth() - 1);

            // Format as yyyy-MM-dd
            const formatDate = (date) => date.toISOString().split("T")[0];

            const response = await api.get(
                `api/urls/totalClicks?startDate=${formatDate(startDate)}&endDate=${formatDate(endDate)}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            return response.data;
        } , 
        {
            // Transformation not required
            // Custom Error Handling
            onError,
            // Does not refetch for 5 seconds
            // Used for caching to optimize performance
            staleTime: 5000
        });
}

// In useQuery, the first argument is a unique key for the query, the second argument is an async function that fetches the data, and the third argument is an options object where we can do transform response in particular format and handle errors using onError callback function.