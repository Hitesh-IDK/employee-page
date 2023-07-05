import toolCss from './ToolTip.module.css';

export default function ToolTip(props) {

    return (
        <div className={toolCss.toolTip}>
            <p>{props.content}</p>
        </div>
    );
}