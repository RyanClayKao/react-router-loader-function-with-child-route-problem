import { useLoaderData, json } from "react-router-dom";
import EventItem from "../components/EventItem";

const EventDetailPage = () => {
    const data = useLoaderData();
    console.log(data);  // get undifined,  why?
    
    return <EventItem event={data.event}/>;
};

export default EventDetailPage;

export async function loader({request, params}) {    
    const id = params.eventId;
    console.log(id);

    const response = await fetch("http://localhost:8080/events/" + id);

    if (!response.ok){
        throw json({message: "Could not fetch detail for selected event."}, {status: 500});
    }else{
        return response;
    }
}