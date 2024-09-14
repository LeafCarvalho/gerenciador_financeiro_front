import React, { useEffect, useState } from 'react'
import { ModalCreateInfos } from '../../modal/modal';
import { Box, List, ListItem, Typography } from '@mui/material';
import {BuscaSaidas} from '@/services/saidas/saidasServices';

const Saidas = () => {
    const [saidas, setSaidas] = useState<any[]>([]);

    const carregarSaidas = async () => {
        try {
            const dataEntradas = await BuscaSaidas();
            setSaidas(dataEntradas);
        } catch (error) {
            console.error('Erro ao carregar saidas:', error);
        }
    };

    useEffect(() => {
        carregarSaidas();
    }, []);

  return (
    <>
        <Box display="flex" justifyContent="end">
            <ModalCreateInfos titulo={"saidas titulo"} conteudo={"saidas conteudo"}/>
        </Box>
        <Box>
        <Typography variant="h4">Saídas:</Typography>
        <List>
            {saidas.map((saida, index) => (
            <ListItem key={index}>
                <Box>
                <Typography variant="body1">{saida.nomesaida}</Typography>
                <Typography variant="body2">{saida.tipoSaida}</Typography>
                <Typography variant="body2">{saida.tipoRecorrencia}</Typography>
                </Box>
            </ListItem>
            ))}
        </List>
        </Box>
    </>
  )
}

export default Saidas