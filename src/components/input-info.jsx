import * as React from 'react';
import PropTypes from 'prop-types';
import {Box, Tab, Tabs} from '@mui/material';
import Regulars from './regulars';
import Payments from './payments';
import Incomes from './incomes';
import Whishlist from './whishlist';
import {outcomesStore} from './../store/outcomes'
import {Link, Route, Routes, useLocation} from 'react-router-dom';

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

const paths = ['/payments', '/incomes', '/whishlist']

const usePathname = () => {
    const location = useLocation();
    return location.pathname;
}

export default function BasicTabs() {
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // path
    const path = usePathname();

    const getIndexOfPath = () => {
        const index = paths.findIndex((element) => element === path);
        if (index === -1) {
            return 0;
        }
        return index;
    }

    const [value, setValue] = React.useState(getIndexOfPath());

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Payments" component={Link} to={paths[0]} data-index={0}/>
                    <Tab label="Income" component={Link} to={paths[1]} data-index={1}/>
                    <Tab label="Whislist"component={Link} to={paths[2]} data-index={2}/>
                </Tabs>
            </Box>
            <Routes>
                <Route path={paths[0]} exact element={
                   <TabPanel value={value} index={0}>
                       <Regulars/>
                       <Payments title={outcomesStore.outcomes[0].title} outcomes={outcomesStore.outcomes[0].value} index={0}/>
                       <Payments title={outcomesStore.outcomes[1].title} outcomes={outcomesStore.outcomes[1].value} index={1}/>
                       <Payments title={outcomesStore.outcomes[2].title} outcomes={outcomesStore.outcomes[2].value} index={2}/>
                       {/* <Button variant="outlined" onClick={() => {outcomesStore.createNewGoup('name')}}>Add new group</Button> */}
                   </TabPanel>}>
                </Route>
                <Route path={paths[1]} exact element={
                    <TabPanel value={value} index={1}>
                        <Incomes/>
                    </TabPanel>}>
                </Route>
                <Route path={paths[2]} exact element={
                    <TabPanel value={value} index={2}>
                        <Whishlist/>
                    </TabPanel>}>
                </Route>
            </Routes>

        </Box>
    );
}