import { useContext, useEffect } from 'react';
import notifCss from './Notification.module.css';
import NotificationContext from '@/contexts/notif-context';
import ErrorUi from './ErrorUi';
import SuccessUi from './SuccessUi';

export default function Notifications(props) {
    const { notification, showNotification, hideNotification } = useContext(NotificationContext);
    const spanStyles = notification.status === 'success' ? notifCss.status_success : notifCss.status_error;

    useEffect(() => {
        const timer = setTimeout(() => {
            hideNotification();
        }, 5000);

        return () => { clearTimeout(timer) };
    }, [notification.content])

    return (
        <div className={notifCss.main_container}>
            {notification.status === 'error' ?
                <ErrorUi content={notification.content} /> :
                notification.status === 'success' ?
                    <SuccessUi content={notification.content} /> :
                    <></>
            }
        </div>
    );
}