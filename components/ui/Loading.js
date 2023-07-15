import loadCss from './Loading.module.css';

const Loading = (props) => {
    return(
        <div className={loadCss.loader}>
            <span className={loadCss.loader_text}>{props.context}</span>
            <span className={loadCss.load}></span>
        </div>
    );
}

export default Loading;