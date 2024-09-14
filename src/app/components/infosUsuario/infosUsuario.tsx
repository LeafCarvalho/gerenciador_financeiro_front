import { Box, Container, Grid, Tab, Tabs, Typography } from '@mui/material';
import { Entradas } from './entradas/entradas'
import Investimentos from './investimentos/investimentos'
import Saidas from './saidas/saidas'
import { useState } from 'react';
import { TabPanelProps } from '@/interfaces/Usuario';

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export const InfosUsuario = () => {
  const [value, setValue] = useState(0);
  const nomeUsuario = localStorage.getItem('name');

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container sx={{ flexGrow: 1, bgcolor: 'background.paper', height: 224, marginTop: '2rem' }}>
      <Typography variant="h6" marginBottom={3}>Olá, {nomeUsuario}, seja bem vindo!</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={2}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: 'divider' }}
          >
            <Tab label="Entradas" {...a11yProps(0)} />
            <Tab label="Saídas" {...a11yProps(1)} />
            <Tab label="Investimentos" {...a11yProps(2)} />
          </Tabs>
        </Grid>

        <Grid item xs={12} sm={10}>
          <TabPanel value={value} index={0}>
            <Entradas />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Saidas />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Investimentos />
          </TabPanel>
        </Grid>
      </Grid>
    </Container>
  )
}