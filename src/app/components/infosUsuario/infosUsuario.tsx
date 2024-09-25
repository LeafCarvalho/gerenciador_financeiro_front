import { Box, Container, Grid, Tab, Tabs, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import Investimentos from './investimentos/investimentos';
import Saidas from './saidas/saidas';
import Entradas from './entradas/entradas';
import { ModalEntrada } from '../modal/ModalEntrada';
import { ModalSaida } from '../modal/ModalSaida';
import { ModalInvestimento } from '../modal/ModalInvestimento';
import { TabPanelProps } from '@/interfaces/Usuario';

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export const InfosUsuario = () => {
  const [value, setValue] = useState(0);
  const [nomeUsuario, setNomeUsuario] = useState<string | null>(null);

  useEffect(() => {
    const nome = localStorage.getItem('nome');
    setNomeUsuario(nome);
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const renderModalCreate = () => {
    switch (value) {
      case 0:
        return <ModalEntrada />;
      case 1:
        return <ModalSaida />;
      case 2:
        return <ModalInvestimento />;
      default:
        return null;
    }
  };

  return (
    <Container sx={{ flexGrow: 1, bgcolor: 'background.paper', height: '100%', marginTop: '2rem' }}>
      <Typography variant="h6" marginBottom={3}>
        Olá, {nomeUsuario || 'Usuário'}, seja bem-vindo!
      </Typography>

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
            <Tab label="Entradas" />
            <Tab label="Saídas" />
            <Tab label="Investimentos" />
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

          {renderModalCreate()}
        </Grid>
      </Grid>
    </Container>
  );
};
