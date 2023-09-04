import "./User.css";
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Weight from './Weight';
import Glucose from './Glucose2';
import Bloodpres from "./Bloodpres";
import Goals from "./Goals";
export default function HealthMetrics() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }} >
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Blood Pressure" value="1" />
            <Tab label="Weight" value="2" />
            <Tab label="Glucose" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1"><Bloodpres/></TabPanel>
        <TabPanel value="2"><Weight/></TabPanel>
        <TabPanel value="3"><Glucose /></TabPanel>
      </TabContext>
    </Box>
  );
}