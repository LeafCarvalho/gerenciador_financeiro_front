import React, { useEffect, useState } from 'react';
import { Box, List, ListItem, Typography, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { BuscaSaidas, DeletaSaida } from '@/services/saidas/saidasServices';

const Saidas = () => {
    const [saidas, setSaidas] = useState<any[]>([]);
    const [saidaToDelete, setSaidaToDelete] = useState<any>(null);
    const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

    const carregarSaidas = async () => {
        try {
            const dataSaidas = await BuscaSaidas();
            setSaidas(dataSaidas);
        } catch (error) {
            console.error('Erro ao carregar saidas:', error);
        }
    };

    useEffect(() => {
        carregarSaidas();
    }, []);

    const handleDeleteClick = (saida: any) => {
        setSaidaToDelete(saida);
        setOpenConfirmDelete(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            if (saidaToDelete) {
                await DeletaSaida(saidaToDelete.id);
                setSaidas(saidas.filter(s => s.id !== saidaToDelete.id));
                setOpenConfirmDelete(false);
                setSaidaToDelete(null);
            }
        } catch (error) {
            console.error('Erro ao deletar saida:', error);
        }
    };

    const handleDeleteCancel = () => {
        setOpenConfirmDelete(false);
        setSaidaToDelete(null);
    };

    return (
        <>
            <Box>
                <List>
                    {saidas.map((saida) => (
                        <ListItem key={saida.id} secondaryAction={
                            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteClick(saida)}>
                                <DeleteIcon />
                            </IconButton>
                        }>
                            <Box>
                                <Typography variant="body1">{saida.nomeSaida}</Typography>
                                <Typography variant="body2">{saida.tipoSaida}</Typography>
                                <Typography variant="body2">{saida.valorSaida}</Typography>
                                <Typography variant="body2">{saida.dataVencimento}</Typography>
                                <Typography variant="body2">{saida.tipoRecorrencia}</Typography>
                            </Box>
                        </ListItem>
                    ))}
                </List>
            </Box>

            <Dialog
                open={openConfirmDelete}
                onClose={handleDeleteCancel}
            >
                <DialogTitle>Confirmar Exclusão</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Deseja excluir a saída de nome {saidaToDelete?.nomeSaida}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel} color="primary">
                        Não, cancelar
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="secondary" autoFocus>
                        Sim, confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Saidas;
