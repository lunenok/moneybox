import * as React from 'react';
import PropTypes from 'prop-types';
import {Container, Box, Tab, Tabs} from '@mui/material';
import Regulars from './regulars';
import Outcomes from './outcomes';
import Incomes from './incomes';

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
    <Container>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Regular" />
              <Tab label="Outcome" />
              <Tab label="Income" />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Regulars/>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Outcomes/>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Incomes/>
          </TabPanel>
        </Box>
    </Container>

  );
}