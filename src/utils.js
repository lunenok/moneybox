import {getIn} from 'formik';

export const showErrorMessageFormik = (touched, errors, name) => {
    const wasTouched = getIn(touched, name)
    const error = getIn(errors, name)
    return wasTouched && error? error : ''
        
};

export const isErrorFormik = (touched, errors, name) => {
    const wasTouched = getIn(touched, name)
    const error = getIn(errors, name)
    return Boolean(wasTouched && error)
};