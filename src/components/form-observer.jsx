import { useEffect } from 'react';
import { useFormikContext } from 'formik';

const FormObserver = ({initialValues, name, setStatus}) => {
    const {values} = useFormikContext();
    useEffect(() => {
        const curr = JSON.stringify(values[name]);
        const init = JSON.stringify(initialValues);
        if (init === curr) {
            setStatus(true);
        } else {
            setStatus(false);
        }
    }, [values]);
};

export default FormObserver;