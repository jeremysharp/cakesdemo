import React from 'react';
import Cake from './components/Cake';
import Container from 'react-bootstrap/Container';
import CakeButtons from './components/CakeButtons';
import { CakeValidator, CakesValidator } from '../validations/validations';

interface Props {
    cakesList: CakesValidator;
    editCake: (id: number) => void;
    deleteCake: (id: number) => Promise<void>;
    viewCake: (id: number) => void;
}

const Cakes = ({ cakesList, editCake, deleteCake, viewCake }: Props): JSX.Element => {
    return (
        <Container className="flexme">
            {cakesList.length ? (
                cakesList.map(
                    (cake: CakeValidator): JSX.Element => {
                        return (
                            <Cake key={cake.id} cake={cake} viewCake={viewCake}>
                                <CakeButtons cake={cake} editCake={editCake} deleteCake={deleteCake} />
                            </Cake>
                        );
                    }
                )
            ) : (
                <div>No cakes yet 😞 Try adding a new one!</div>
            )}
        </Container>
    );
};

export default Cakes;
