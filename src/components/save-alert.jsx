import React from 'react';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import { Typography } from '@mui/material';

const SaveAlert = ({isSave}) => {
    if (!isSave) {
        return (
            <React.Fragment>
                <ReportGmailerrorredIcon mr={1} color={'error'} ></ReportGmailerrorredIcon>
                <Typography color={'error'}>Data are not saved</Typography>
            </React.Fragment>
        )
    };
    return (
        <div></div>
    )
};

export default SaveAlert;