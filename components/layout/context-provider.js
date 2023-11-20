import { NotificationContextProvider } from "@/contexts/notif-context";
import { PageContextProvider } from "@/contexts/page-context";

export default function ContextProviders(props) {
    return (
        <>
            <PageContextProvider>
                <NotificationContextProvider>
                    {props.children}
                </NotificationContextProvider>
            </PageContextProvider>
        </>
    );
}