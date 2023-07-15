import { useState } from 'react';
import card from './InputCard.module.css';

export default function InputCard (props) {
    const [cardCss, setCardCss] = useState(card.input_card);

    if(props.isInvalid) {
        setCardCss(`${card.input_card} ${card.invalid}`);
    }
    return (
        <div className={cardCss}>
            {props.children}
        </div>
    );
}