import { useRouteError } from "react-router-dom";
import PageContent from "../components/PageContent";
import MainNavigation from "../components/MainNavigation";

const ErrorPage = () => {
    const error = useRouteError();

    let title = "An error occurred!";
    let message = "Something went wrong";

    if (error.status === 500) {
        // 使用 js 原生的 Response時，需要做序列化、反序列化的處理
        // message = JSON.parse(error.data).message;

        // 在 loader function 那裏使用了 react-router-dom 的 json()，就可以不用處理序列化、反序列化的事情
        message = error.data.message;
    }

    if (error.status === 404) {
        title = "Not found!";
        message = "Could not find resource or page.";
    }

    return <>
        <MainNavigation />
        <PageContent title={title}>
            <p>{message}</p>
        </PageContent>
    </>;
};

export default ErrorPage;