import React from 'react';
import styles from './ViewCake.module.css';
import { API_ROOT } from '../config.json';
import { CakeValidator } from '../validations/validations';

interface Props {
    viewCake: (id: number) => void;
    cake: CakeValidator;
}

const ViewCake = ({ viewCake, cake }: Props): JSX.Element => {
    const imageUrl = `${API_ROOT}/image/${cake.imageUrl}`;

    const handleView = (): void => {
        viewCake(0);
    };

    return (
        <div className={styles.container} onClick={handleView}>
            <div className={styles.main}>
                <img className={styles.image} src={imageUrl} alt="" />
                <div className={styles.overlay}>
                    <div>
                        <div className={styles.info}>
                            <div className={styles.yum}>
                                <div className={styles.yumFactor}>{cake.yumFactor}</div>
                                <div className={styles.yumTitle}>YUMFACTOR</div>
                            </div>

                            <div className={styles.comment}>
                                <span>{cake.comment}</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.name}>{cake.name}</div>
                </div>
            </div>
        </div>
    );
};
export default ViewCake;
