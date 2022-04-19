import * as React from 'react';
import PropTypes from 'prop-types';
import {Box, Tab, Tabs} from '@mui/material';
import Regulars from './regulars';
import Payments from './payments';
import Incomes from './incomes';
import Whishlist from './whishlist';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

  return (
    <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function BasicTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
  
    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Payments"/>
                    <Tab label="Income"/>
                    <Tab label="Whislist"/>
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Regulars/>
                <Payments/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Incomes/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Whishlist/>
            </TabPanel>
        </Box>

    );
}