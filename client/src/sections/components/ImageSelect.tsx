import React, { ChangeEvent } from 'react';
import Form from 'react-bootstrap/Form';

interface Props {
    imageChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const ImageSelect = ({ imageChange }: Props): JSX.Element => {
    return (
        <Form.Group controlId="formFile" className="mb-3">
            <Form.Control type="file" onChange={imageChange} accept=".jpg,.jpeg,.gif,.png" />
        </Form.Group>
    );
};

export default ImageSelect;
