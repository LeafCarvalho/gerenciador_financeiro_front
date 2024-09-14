import { useEffect, useState } from 'react'
import { ModalCreateInfos } from '../../modal/modal';
import { Box, List, ListItem, Typography } from '@mui/material';
import { buscaEntradas } from '@/services/entradas/entradasServices';

export const Entradas = () => {
    const [entradas, setEntradas] = useState<any[]>([]);

    const carregarEntradas = async () => {
        try {
            const dataEntradas = await buscaEntradas();
            setEntradas(dataEntradas);
        } catch (error) {
            console.error('Erro ao carregar entradas:', error);
        }
    };

    useEffect(() => {
        carregarEntradas();
    }, []);

  return (
    <>
        <Box display="flex" justifyContent="end">
            <ModalCreateInfos titulo={"entrada titulo"} conteudo={"entrada corpo"}/>
        </Box>
        <Box>
        <Typography variant="h4">Entradas:</Typography>
        <List>
            {entradas.map((entrada, index) => (
            <ListItem key={index}>
                <Box>
                <Typography variant="body1">{entrada.nomeEntrada}</Typography>
                <Typography variant="body2">{entrada.tipoEntrada}</Typography>
                <Typography variant="body2">{entrada.tipoRecorrencia}</Typography>
                </Box>
            </ListItem>
            ))}
        </List>
        </Box>
    </>
  )
}