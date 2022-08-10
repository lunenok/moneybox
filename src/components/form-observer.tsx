import { useEffect } from 'react';
import { FormikProps, useFormikContext } from 'formik';
import { IncomesType, OutcomesType, RegularsType, WhishlistType } from '../types/types';

// Имеет значение в каком порядке приходит initialValues, имеет смысл делать сортировку по алфавиту перед сравнением. Допилить.
const FormObserver: React.FC<PropTypes> = ({initialValues, setStatus}) => {
    let {values}: FormikProps<ContextTypes> = useFormikContext();
    useEffect(() => {
        const curr =  JSON.stringify(values)
        const init = JSON.stringify(initialValues);
        if (init === curr) {
            setStatus(true);
        } else {
            setStatus(false);
        }
    }, [values]);
    return (
        <div></div>
    )
};

type PaymentsType = {
    title: string,
    payments: Array<PaymentsType>
};

type ContextTypes = PaymentsType| IncomesType | RegularsType| WhishlistType;

type PropTypes = {
    initialValues: OutcomesType | WhishlistType | RegularsType | IncomesType,
    setStatus: (status: boolean) => void;
};

export default FormObserver;