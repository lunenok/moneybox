import { useEffect } from 'react';
import { useFormikContext } from 'formik';

// Имеет значение в каком порядке приходит initialValues, имеет смысл делать сортировку по алфавиту перед сравнением. Допилить.
const FormObserver = ({initialValues, name, setStatus}) => {
    const {values} = useFormikContext();
    useEffect(() => {
        let curr = null;
        name ? curr = JSON.stringify(values[name]) : curr = JSON.stringify(values);
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

export default FormObserver;