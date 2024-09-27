import React, { useEffect, useState } from 'react';
import { Box, List, ListItem, Typography, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { BuscaInvestimentos, DeletaInvestimento } from '@/services/investimentos/investimentosServices';

const Investimentos = () => {
    const [investimentos, setInvestimentos] = useState<any[]>([]);
    const [investimentoSelecionado, setInvestimentoSelecionado] = useState<any>(null);
    const [openDialog, setOpenDialog] = useState(false);

    const carregarInvestimentos = async () => {
        try {
            const dataInvestimentos = await BuscaInvestimentos();
            setInvestimentos(dataInvestimentos);
        } catch (error) {
            console.error('Erro ao carregar investimentos:', error);
        }
    };

    const handleDelete = async () => {
        if (investimentoSelecionado) {
            try {
                await DeletaInvestimento(investimentoSelecionado.id);
                setInvestimentos(investimentos.filter((inv) => inv.id !== investimentoSelecionado.id));
                setOpenDialog(false);
            } catch (error) {
                console.error('Erro ao excluir investimento:', error);
            }
        }
    };

    const handleOpenDialog = (investimento: any) => {
        setInvestimentoSelecionado(investimento);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    useEffect(() => {
        carregarInvestimentos();
    }, []);

    return (
        <>
            <Box>
                <List>
                    {investimentos.map((investimento) => (
                        <ListItem key={investimento.id}>
                            <Box>
                                <Typography variant="body1">{investimento.nomeInvestimento}</Typography>
                                <Typography variant="body2">{investimento.tipoInvestimento}</Typography>
                                <Typography variant="body2">{investimento.valorInvestimento}</Typography>
                                <Typography variant="body2">{investimento.categoria}</Typography>
                                <Typography variant="body2">{investimento.dataInvestimentoInicial}</Typography>
                                <Typography variant="body2">{investimento.dataInvestimentoFinal}</Typography>
                                <Typography variant="body2">{investimento.tipoRecorrencia}</Typography>
                            </Box>
                            <IconButton onClick={() => handleOpenDialog(investimento)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
                    ))}
                </List>
            </Box>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Confirmar Exclusão</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Deseja excluir o investimento de nome {investimentoSelecionado?.nomeInvestimento}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleDelete} color="secondary">
                        Excluir
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Investimentos;
