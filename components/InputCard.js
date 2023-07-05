import card from './InputCard.module.css';

export default function InputCard (props) {
    return (
        <div className={card.input_card}>
            {props.children}
        </div>
    );
}