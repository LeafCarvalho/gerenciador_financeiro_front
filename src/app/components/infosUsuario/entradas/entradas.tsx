import { useEffect, useState } from 'react';
import { Box, List, ListItem, Typography, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { buscaEntradas, deletaEntrada } from '@/services/entradas/entradasServices';

const Entradas = () => {
    const [entradas, setEntradas] = useState<any[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [entradaSelecionada, setEntradaSelecionada] = useState<any | null>(null);

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

    const handleDeleteClick = (entrada: any) => {
        setEntradaSelecionada(entrada);
        setOpenDialog(true);
    };

    const handleConfirmDelete = async () => {
        if (entradaSelecionada) {
            try {
                await deletaEntrada(entradaSelecionada.id);
                setEntradas((prevEntradas) => prevEntradas.filter(e => e.id !== entradaSelecionada.id));
                setOpenDialog(false);
            } catch (error) {
                console.error('Erro ao excluir entrada:', error);
            }
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEntradaSelecionada(null);
    };

    return (
        <>
            <Box>
                <List>
                    {entradas.map((entrada) => (
                        <ListItem key={entrada.id} secondaryAction={
                            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteClick(entrada)}>
                                <DeleteIcon />
                            </IconButton>
                        }>
                            <Box>
                                <Typography variant="body1">{entrada.nomeEntrada}</Typography>
                                <Typography variant="body2">{entrada.tipoEntrada}</Typography>
                                <Typography variant="body2">{entrada.valorEntrada}</Typography>
                                <Typography variant="body2">{entrada.tipoRecorrencia}</Typography>
                                <Typography variant="body2">{entrada.dataEntrada}</Typography>
                            </Box>
                        </ListItem>
                    ))}
                </List>
            </Box>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Confirmar Exclusão</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Deseja excluir a entrada {entradaSelecionada?.nomeEntrada}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Não, cancelar
                    </Button>
                    <Button onClick={handleConfirmDelete} color="secondary" autoFocus>
                        Sim, confirmar!
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Entradas;
