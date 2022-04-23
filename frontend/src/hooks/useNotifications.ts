import { api, utils } from "@epnsproject/frontend-sdk-staging";
import {useAsync} from "react-async";

export function useNotifications (walletAddress: string) {
    const { data, error, isPending, run } = useAsync(() => fetchNotifications(walletAddress), [])
    return { data, error, isPending, run }
}

export async function fetchNotifications(walletAddress: string) {
    const {count, results} = await api.fetchNotifications(walletAddress)
    console.log("Notifications count:", count)
    console.log({results});
    //fetch the notifications


    //parse the notification fetched
    const parsedResponse = utils.parseApiResponse(results);
    console.log(parsedResponse);

    return parsedResponse
}