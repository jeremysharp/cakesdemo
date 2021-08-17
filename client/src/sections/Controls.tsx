import React from 'react';
import Button from 'react-bootstrap/Button';
import styles from './Controls.module.css';

interface Props {
    setShow: () => void;
}

const Controls = ({ setShow }: Props): JSX.Element => {
    return (
        <div className={styles.controls}>
            <Button size="sm" onClick={setShow}>
                <i className="bi bi-plus-lg" />
                <span className="icon-left">Add cake</span>
            </Button>
        </div>
    );
};
export default Controls;
