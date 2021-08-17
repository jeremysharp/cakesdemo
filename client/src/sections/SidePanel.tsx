import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import CakeForm from './components/CakeForm';
import { CakeValidator } from '../validations/validations';

interface Props {
    show: boolean;
    setShow: (state: boolean) => void;
    insertCake: (cake: CakeValidator) => void;
    stopEdit: () => void;
    cake: CakeValidator | null;
}

const SidePanel = ({ show, setShow, insertCake, stopEdit, cake = null }: Props): JSX.Element => {
    const handleClose = () => {
        setShow(false);
    };
    return (
        <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>{cake ? 'Edit' : 'Add'} Cake</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <CakeForm setShow={setShow} insertCake={insertCake} cake={cake} stopEdit={stopEdit} />
            </Offcanvas.Body>
        </Offcanvas>
    );
};
export default SidePanel;
