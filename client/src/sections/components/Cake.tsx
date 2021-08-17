import React from 'react';
import Card from 'react-bootstrap/Card';
import YumFactor from './YumFactor';
import { CakeValidator } from '../../validations/validations';
import { API_ROOT } from '../../config.json';

interface Props {
    cake: CakeValidator;
    viewCake?: (key: number) => void;
    children?: React.ReactNode;
}

const Cake = ({ viewCake, cake, children }: Props): JSX.Element => {
    const handleView = (): void => {
        if (cake && typeof cake.id === 'number') viewCake(cake.id);
    };

    const imageUrl: string = !cake ? '' : cake.imageUrl.includes('.') ? `${API_ROOT}/image/${cake.imageUrl}` : cake.imageUrl;
    return cake ? (
        <Card className="cake-card">
            <Card.Img variant="top" src={imageUrl} onClick={handleView} />
            <Card.Body>
                <Card.Title>{cake.name}</Card.Title>
                <Card.Text className="comment">{cake.comment}</Card.Text>
                <YumFactor yumFactor={cake.yumFactor} />
                {children}
            </Card.Body>
        </Card>
    ) : null;
};
export default Cake;
