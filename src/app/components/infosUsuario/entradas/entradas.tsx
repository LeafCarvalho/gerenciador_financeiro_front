import { useEffect, useState } from 'react';
import { Box, List, ListItem, Typography } from '@mui/material';
import { buscaEntradas } from '@/services/entradas/entradasServices';

const Entradas = () => {
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
            <Box>
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
    );
};

export default Entradas;
