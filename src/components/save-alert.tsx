import React from 'react';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import { Typography } from '@mui/material';

const SaveAlert: React.FC<PropTypes> = ({isSave}) => {
    if (!isSave) {
        return (
            <React.Fragment>
                <ReportGmailerrorredIcon color={'error'} ></ReportGmailerrorredIcon>
                <Typography color={'error'}>Data are not saved</Typography>
            </React.Fragment>
        )
    };
    return (
        <div></div>
    )
};

type PropTypes = {
    isSave: boolean
};

export default SaveAlert;