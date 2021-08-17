export interface CakeValidator {
    id?: number;
    name: string;
    comment: string;
    yumFactor: any;
    imageUrl?: string;
    image?: File;
}

export type CakesValidator = CakeValidator[];
export type CakeOrEmpty = CakeValidator | null | undefined;

export interface AlertResponseValidator {
    isConfirmed: boolean;
    isDenied: boolean;
    isDismissed: boolean;
    value?: boolean | string | undefined | null;
    dismiss?: {};
}

export interface FieldValidation {
    valid: () => boolean;
    desc: string;
}

export interface FieldValidations {
    name: FieldValidation;
    comment: FieldValidation;
    yumFactor: FieldValidation;
    image: FieldValidation;
}

export interface DataResponseValidator {
    id: number;
}

export interface ResponseValidator {
    data: DataResponseValidator | CakeValidator | File;
    status: number;
    statusText: string;
}
