import { AppBar, Container, Toolbar, Button, Typography } from '@mui/material';
import React from 'react';

function Header() {
    return (
        <AppBar sx={{position: 'sticky'}}>
            <Container>
                <Toolbar>
                    <Typography variant='h6' component='span' sx={{mr: 'auto'}}>
                        MoneyBox
                    </Typography>
                    <Button sx={{ my: 2, color: 'white', display: 'block' }}>Ввод данных</Button>
                    <Button sx={{ my: 2, color: 'white', display: 'block', ml: 4 }}>Расчет</Button>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header