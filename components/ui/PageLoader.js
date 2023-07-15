import pageLoadCss from './PageLoader.module.css';

export default function PageLoader() {
    return (
        <div className={pageLoadCss.spinner}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
}