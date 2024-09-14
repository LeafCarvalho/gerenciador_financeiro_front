import React, { useState } from 'react';
import { Button, Modal, Box, Typography, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ModalCreateInfosProps } from '@/interfaces/Usuario';

export const ModalCreateInfos: React.FC<ModalCreateInfosProps> = ({ titulo, conteudo }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Exemplo de submissão de formulário
    console.log('Formulário enviado');
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Novo
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-title" variant="h6" component="h2">
            {titulo}
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            {conteudo}
          </Typography>

          {/* Formulário */}
          <form onSubmit={handleSubmit}>
            <Box sx={{ mt: 3 }}>
              <TextField
                fullWidth
                label="Nome Aleatório"
                variant="outlined"
                required
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              <Button type="submit" variant="contained" color="primary">
                Enviar
              </Button>
            </Box>
          </form>

          <IconButton 
            onClick={handleClose} 
            sx={{ position: 'absolute', top: 10, right: 10 }}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Modal>
    </>
  );
};
