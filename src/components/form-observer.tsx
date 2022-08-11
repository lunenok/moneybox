import { useEffect } from 'react';
import { FormikProps, useFormikContext } from 'formik';
import { IncomesType, RegularsType, WhishlistType, Outcome } from '../types/types';

// Имеет значение в каком порядке приходит initialValues, имеет смысл делать сортировку по алфавиту перед сравнением. Допилить.
const FormObserver: React.FC<PropTypes> = ({initialValues, setStatus}) => {
    let {values}: FormikProps<ContextTypes> = useFormikContext();
    useEffect(() => {
        const curr =  JSON.stringify(values)
        const init = JSON.stringify(initialValues);
        // console.log('init', init);
        // console.log('curr', curr);
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

type ContextTypes = Outcome| IncomesType | RegularsType | WhishlistType;

type PropTypes = {
    initialValues: Outcome | WhishlistType | RegularsType | IncomesType,
    setStatus: (status: boolean) => void;
};

export default FormObserver;