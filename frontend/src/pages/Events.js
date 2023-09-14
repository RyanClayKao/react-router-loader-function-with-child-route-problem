import { useLoaderData, json } from "react-router-dom";

import EventsList from '../components/EventsList';

function EventsPage() {
    // 這裡的 events 只是我們自己取的變數名稱，實際上就是透過 useLoaderData() 直接拿到 loader 回傳的值。
    const data = useLoaderData();

    // 透過下方的自訂回傳物件，可以做自訂的渲染
    // 註：但是這個不是最好的方式
    // if (data.isError){
    //     return <p>{data.message}</p>
    // }

    const events = data.events;

    return (
        // 在 EventsList 中也可以使用 useLoaderData() 的資料，因為他是子路由
        // 註： useLoaderData() 只可以在有使用 loader屬性的組件或是子路由組件中才可以使用，其他的存取不到值
        <EventsList events={events} />
    );
}

export default EventsPage;

export const loader = async () => {
    // 測試方式，改掉這裡的 API路徑，讓他噴錯
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {
        // 在這裡來說也可以回傳物件回去，再透過判斷 isError 是否存在，就可以再決定是否載入自訂的錯誤訊息
        // return { isError: true, message: "Could not fetch events."};

        // 比較好的方式是可以拋出錯誤，那麼在 createBrowserRouter 中離的最近的 errorElement 就會發揮作用
        // throw { message: "Could not fetch events."};

        // 更好的方式：回傳一個 Response
        // throw new Response(JSON.stringify({
        //     message: "Could not fetch events.",
        // }), {
        //     status: 500,
        // });

        // 再升級更好的處理方式，使用 react-router-dom 的 json()，最終也是回傳 Response，但可以省掉要處理序列化、反序列化的事情
        throw json({
            message: "Could not fetch events.",
        }, {status: 500})
    } else {
        // 使用 fetch 預設就會是回傳 response，所以可以直接這樣做回傳
        return response;
    }
};