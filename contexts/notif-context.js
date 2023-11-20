import { createContext, useState } from "react"

const NotificationContext = createContext({
    notification: null,
    showNotification: function (notification) { },
    hideNotification: function () { }
});

export default NotificationContext;

export function NotificationContextProvider(props) {
    const [notification, setNotification] = useState();

    const showNotification = (notification) => {
        setNotification(notification);
    }

    const hideNotification = () => {
        setNotification(null);
    }

    const notificationContext = {
        content: notification ? notification.content : null,
        status: notification ? notification.status : null
    }

    const context = {
        notification: notificationContext,
        showNotification,
        hideNotification
    }

    return (
        <NotificationContext.Provider value={context}>
            {props.children}
        </NotificationContext.Provider>
    );
}