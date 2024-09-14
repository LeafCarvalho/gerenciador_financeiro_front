import React, { useEffect, useState } from 'react'
import { ModalCreateInfos } from '../../modal/modal';
import { Box, List, ListItem, Typography } from '@mui/material';
import {BuscaInvestimentos} from '@/services/investimentos/investimentosServices';

export const Investimentos = () => {
    const [investimentos, setInvestimentos] = useState<any[]>([]);

    const carregarInvestimentos = async () => {
        try {
            const dataInvestimentos = await BuscaInvestimentos();
            setInvestimentos(dataInvestimentos);
        } catch (error) {
            console.error('Erro ao carregar investimentos:', error);
        }
    };

    useEffect(() => {
        carregarInvestimentos();
    }, []);

  return (
    <>
        <Box display="flex" justifyContent="end">
            <ModalCreateInfos titulo={"investimentos titulo"} conteudo={"investimentos conteudo"}/>
        </Box>
        <Box>
        <Typography variant="h4">Investimentos:</Typography>
        <List>
            {investimentos.map((investimento, index) => (
            <ListItem key={index}>
                <Box>
                <Typography variant="body1">{investimento.nomeinvestimento}</Typography>
                <Typography variant="body2">{investimento.tipoInvestimento}</Typography>
                <Typography variant="body2">{investimento.tipoRecorrencia}</Typography>
                </Box>
            </ListItem>
            ))}
        </List>
        </Box>
    </>
  )
}

export default Investimentos