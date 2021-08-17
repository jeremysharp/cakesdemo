//@ts-ignore
import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Container from 'react-bootstrap/Container';
import ImageSelect from './ImageSelect';
import Cake from './Cake';
import axios from 'axios';
import { toast } from 'react-toastify';
import YumFactor from './YumFactor';
import { API_ROOT } from '../../config.json';
import styles from './CakeForm.module.css';
import 'rc-slider/assets/index.css';
import { CakeOrEmpty, CakeValidator, DataResponseValidator, FieldValidations } from '../../validations/validations';

interface Props {
    cake: CakeOrEmpty;
    setShow: (state: boolean) => void;
    insertCake: (cake: CakeValidator) => void;
    stopEdit: () => void;
}

const CakeForm = ({ cake = null, setShow, insertCake, stopEdit }: Props): JSX.Element => {
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [yumFactor, setYumFactor] = useState<any>(0);
    const [image, setImage] = useState<any>(null);
    const [imageUrl, setImageUrl] = useState('');
    const [nameIsValid, setNameIsValid] = useState('invalid');
    const [commentIsValid, setCommentIsValid] = useState('invalid');
    const [useCurrentImage, setUseCurrentImage] = useState(false);
    const [id, setId] = useState<number | null>(null);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current !== null) inputRef.current.focus();
        if (cake && typeof cake.id === 'number') {
            setId(cake.id);
            setName(cake.name);
            setComment(cake.comment);
            setYumFactor(parseInt(cake.yumFactor));
            setImageUrl(cake.imageUrl);
            setUseCurrentImage(true);
        }
    }, [cake]);

    const cancelCake = () => {
        setName('');
        setComment('');
        setYumFactor(0);
        setImage(null);
        setShow(false);
        stopEdit();
    };

    const saveCake = async ({ image, cake }: { image: File; cake: CakeValidator }) => {
        try {
            const { data }: { data: DataResponseValidator } = await axios.post(`${API_ROOT}/cake`, cake);
            if (!useCurrentImage) {
                const formData: FormData = new FormData();
                formData.append('image', image);
                await axios.post(`${API_ROOT}/image/${data.id}`, formData);
            }
            const { data: retrievedCake }: { data: CakeValidator } = await axios.get(`${API_ROOT}/cake/${data.id}`);
            insertCake(retrievedCake);
            stopEdit();
            toast.success('Cake saved!');
        } catch (err) {
            toast.error('Save failed: ' + err);
        }
    };

    const handleSaveCake = async () => {
        const cake: CakeValidator = { name, comment, yumFactor };
        if (!useCurrentImage && image) cake.image = image.name;
        if (id) cake.id = id;
        await saveCake({ cake, image });
        setShow(false);
    };
    const VALIDATIONS: FieldValidations = {
        name: {
            valid: () => name.length <= 30 && name.length > 0,
            desc: 'Name is required, and must be 30 characters or less',
        },
        comment: {
            valid: () => comment.length <= 200 && comment.length > 0,
            desc: 'Comment is required, and must be 200 characters or less',
        },
        yumFactor: {
            valid: () => [1, 2, 3, 4, 5].includes(parseInt(yumFactor)),
            desc: 'Yum Factor is required, and must be a number between 1 and 5',
        },
        image: {
            valid: () => useCurrentImage || (image && image.size < 2 * 1024 * 1024),
            desc: 'image must have a valid image less than 2MB',
        },
    };

    const checkValidations = () => {
        let errors = 0;
        Object.keys(VALIDATIONS).forEach((field: string) => {
            if (!VALIDATIONS[field].valid()) {
                errors++;
                toast.error(VALIDATIONS[field].desc);
            }
        });
        if (!errors) handleSaveCake();
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name: inputName, value: inputValue }: { name: string; value: string | number } = event.target;
        switch (inputName) {
            case 'name': {
                setName(inputValue);
                setNameIsValid(VALIDATIONS.name.valid() ? 'valid' : 'invalid');
                break;
            }
            case 'comment': {
                setComment(inputValue);
                setCommentIsValid(VALIDATIONS.comment.valid() ? 'valid' : 'invalid');
                break;
            }
            case 'yumFactor': {
                setYumFactor(parseInt(inputValue));
                break;
            }
            default: {
                return;
            }
        }
    };

    const imageChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUseCurrentImage(false);
        setImageUrl(URL.createObjectURL(event.target.files[0]));
        setImage(event.target.files[0]);
    };

    const cakeTmp: any = { name, comment, yumFactor, imageUrl };

    return (
        <Container>
            <Form>
                <div className={styles.fieldLabel}>Name</div>
                <InputGroup className="mb-3">
                    <FormControl
                        ref={inputRef}
                        name="name"
                        className={nameIsValid}
                        placeholder="Give your cake a name"
                        aria-label="cake name"
                        value={name}
                        onChange={handleChange}
                    />
                </InputGroup>
                <div className={styles.fieldLabel}>Comment</div>
                <InputGroup className="mb-3">
                    <FormControl
                        name="comment"
                        as="textarea"
                        className={commentIsValid}
                        placeholder="Describe your cake"
                        aria-label="comment"
                        value={comment}
                        onChange={handleChange}
                    />
                </InputGroup>
                <YumFactor yumFactor={yumFactor} setYumFactor={setYumFactor} />
                <ImageSelect imageChange={imageChange} />
                <Button onClick={checkValidations} variant="outline-success" size="sm">
                    <i className="bi bi-save" />
                    <span className="icon-left">Save</span>
                </Button>
                &nbsp;
                <Button onClick={cancelCake} variant="outline-danger" size="sm">
                    <i className="bi bi-x-circle" />
                    <span className="icon-left">Cancel</span>
                </Button>
                <div className={styles.fieldLabel}>Preview</div>
                <div className={styles.preview}>
                    <Cake cake={cakeTmp} />
                </div>
            </Form>
        </Container>
    );
};

export default CakeForm;
