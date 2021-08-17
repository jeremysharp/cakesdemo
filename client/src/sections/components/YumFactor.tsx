import React, { Dispatch } from 'react';
import Slider from 'rc-slider';

interface Props {
    yumFactor: number;
    setYumFactor?: Dispatch<number>;
}

const YumFactor = ({ yumFactor, setYumFactor }: Props): JSX.Element => {
    const handleSetYum = (yum: number): void => {
        if (setYumFactor) setYumFactor(yum);
    };
    return (
        <div className="slider-container">
            <div className="field-label">Yum Factor</div>
            <div className="slider">
                <Slider className="slider" min={1} max={5} marks={{ 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 }} value={yumFactor} onChange={handleSetYum} />
            </div>
        </div>
    );
};
export default YumFactor;
