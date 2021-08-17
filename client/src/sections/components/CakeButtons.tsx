import React from 'react';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import { CakeValidator, AlertResponseValidator } from '../../validations/validations';
interface Props {
    cake: CakeValidator;
    editCake: (id: number) => void;
    deleteCake: (id: number) => Promise<void>;
}

const CakeButtons = ({ cake, editCake, deleteCake }: Props): JSX.Element => {
    const handleEdit = (): void => {
        if (typeof cake.id === 'number') editCake(cake.id);
    };
    const handleDelete = async (): Promise<void> => {
        if (typeof cake.id === 'number') {
            const result: AlertResponseValidator = await Swal.fire({
                icon: 'question',
                title: 'Delete cake',
                text: 'Are you sure?',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it',
            });
            if (result.isConfirmed) deleteCake(cake.id);
        }
    };
    return (
        <div>
            <Button variant="outline-primary" size="sm" onClick={handleEdit}>
                <i className="bi bi-pencil" />
                <span className="icon-left">Edit</span>
            </Button>
            &nbsp;
            <Button variant="outline-danger" size="sm" onClick={handleDelete}>
                <i className="bi bi-trash" />
                <span className="icon-left">Delete</span>
            </Button>
        </div>
    );
};
export default CakeButtons;
