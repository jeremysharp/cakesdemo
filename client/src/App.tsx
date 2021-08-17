import React from 'react';
import './css/App.css';
import axios from 'axios';
import Cakes from './sections/Cakes';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import SidePanel from './sections/SidePanel';
import Controls from './sections/Controls';
import ViewCake from './sections/ViewCake';
import Header from './sections/Header';
import Footer from './sections/Footer';
import { API_ROOT } from './config.json';
import { CakesValidator, CakeValidator, CakeOrEmpty, ResponseValidator } from './validations/validations';

interface StateValidator {
    cakesList: CakesValidator;
    show: boolean;
    editingCake: CakeOrEmpty;
    viewingCake: CakeOrEmpty;
}

class App extends React.Component {
    state: StateValidator = {
        cakesList: [],
        show: false,
        editingCake: null,
        viewingCake: null,
    };

    getCakes = async (): Promise<void> => {
        try {
            const response: ResponseValidator = await axios.get(`${API_ROOT}/`);
            this.setState({ cakesList: response.data });
        } catch (err) {
            toast.error('Getting cakes failed: ' + err);
        }
    };

    editCake = (id: number): void => {
        this.setState({ editingCake: this.state.cakesList.find((cake: CakeValidator) => cake?.id === id) });
        this.setState({ show: true });
    };

    stopEdit = (): void => {
        this.setState({ editingCake: null });
    };

    viewCake = (id: number): void => {
        const viewingCake: CakeOrEmpty = this.state.viewingCake ? null : this.state.cakesList.find((cake: CakeValidator) => cake?.id === id);
        this.setState({ viewingCake });
    };

    insertCake = (cake: CakeValidator): void => {
        const index: number = this.state.cakesList.findIndex((c: CakeValidator) => c?.id === cake?.id);
        if (index > -1) {
            const cakesList: CakesValidator = [...this.state.cakesList];
            cakesList[index] = Object.assign({}, cakesList[index], cake);
            this.setState({ cakesList });
        } else {
            this.setState({ cakesList: [cake, ...this.state.cakesList] });
        }
    };

    setShow = (showState?: boolean): void => {
        this.setState({ show: !!showState });
        if (!showState) this.setState({ editingCake: null });
    };

    deleteCake = async (id: number): Promise<void> => {
        try {
            await axios.delete(`${API_ROOT}/cake/${id}`);
            const index = this.state.cakesList.findIndex((c: CakeValidator) => c?.id === id);
            if (index > -1) {
                const cakes: CakesValidator = [...this.state.cakesList];
                cakes.splice(index, 1);
                this.setState({ cakesList: cakes });
            }
        } catch (err) {
            toast.error('Error deleting cake: ' + err);
        }
    };

    componentDidMount = (): void => {
        this.getCakes();
    };

    render(): JSX.Element {
        const {
            cakesList,
            show,
            editingCake,
            viewingCake,
        }: { cakesList: CakesValidator, show: boolean, editingCake: CakeOrEmpty, viewingCake: CakeOrEmpty } = this.state;
        return (
            <div className="App">
                {viewingCake ? <ViewCake cake={viewingCake} viewCake={this.viewCake} /> : null}
                <Header />
                <div className="main">
                    <Controls setShow={this.setShow} />

                    <SidePanel
                        show={show}
                        setShow={this.setShow}
                        insertCake={this.insertCake}
                        cake={editingCake}
                        stopEdit={this.stopEdit}
                    />

                    <Cakes cakesList={cakesList} editCake={this.editCake} deleteCake={this.deleteCake} viewCake={this.viewCake} />

                </div>
                <Footer />
                <ToastContainer />
            </div>
        );
    }
}
export default App;
