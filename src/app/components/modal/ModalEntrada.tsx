import React, { useState } from 'react';
import {
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  IconButton,
} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import CloseIcon from '@mui/icons-material/Close';
import { criaEntrada } from '@/services/entradas/entradasServices';

const getErrorMessage = (error: any): string | undefined => {
  if (!error) return undefined;
  if (typeof error.message === 'string') {
    return error.message;
  }
  return undefined;
};

export const ModalEntrada: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFile(null);
  };

  const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
  };

  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();

  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      await criaEntrada(data, file);
      console.log('Entrada criada com sucesso');
      handleClose();
      reset();
    } catch (error) {
      console.error('Erro ao criar entrada:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Nova Entrada
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style} component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Criar Entrada
          </Typography>

          <TextField
            label="Nome da Entrada"
            {...register('nomeEntrada', { required: 'Nome da Entrada é obrigatório' })}
            error={!!errors.nomeEntrada}
            helperText={getErrorMessage(errors.nomeEntrada)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Tipo de Entrada"
            {...register('tipoEntrada', { required: 'Tipo de Entrada é obrigatório' })}
            error={!!errors.tipoEntrada}
            helperText={getErrorMessage(errors.tipoEntrada)}
            fullWidth
            margin="normal"
          />

          <FormControl fullWidth margin="normal" error={!!errors.idRecorrencia}>
            <InputLabel id="id-recorrencia-label">Tipo de Recorrência</InputLabel>
            <Select
              labelId="id-recorrencia-label"
              id="id-recorrencia"
              label="Tipo de Recorrência"
              defaultValue=""
              {...register('idRecorrencia', { required: 'Tipo de Recorrência é obrigatória' })}
            >
              <MenuItem value={1}>Mensal</MenuItem>
              <MenuItem value={2}>Anual</MenuItem>
            </Select>
            {errors.idRecorrencia && (
              <FormHelperText error>{getErrorMessage(errors.idRecorrencia)}</FormHelperText>
            )}
          </FormControl>

          <NumericFormat
            customInput={TextField}
            label="Valor da Entrada"
            fullWidth
            margin="normal"
            decimalSeparator=","
            thousandSeparator="."
            prefix="R$ "
            decimalScale={2}
            fixedDecimalScale
            allowNegative={false}
            error={!!errors.valorEntrada}
            helperText={getErrorMessage(errors.valorEntrada)}
            {...register('valorEntrada', { required: 'Valor da Entrada é obrigatório' })}
            onValueChange={(values) => {
              const { floatValue } = values;
              if (floatValue !== undefined) {
                setValue('valorEntrada', floatValue);
              } else {
                setValue('valorEntrada', '');
              }
            }}
          />

          <TextField
            label="Data da Entrada"
            type="date"
            InputLabelProps={{ shrink: true }}
            {...register('dataEntrada', { required: 'Data da Entrada é obrigatória' })}
            error={!!errors.dataEntrada}
            helperText={getErrorMessage(errors.dataEntrada)}
            fullWidth
            margin="normal"
          />

          <InputLabel sx={{ mt: 2 }}>Recibo da Entrada</InputLabel>
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={handleFileChange}
            style={{ marginTop: '8px' }}
          />

          <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
            Criar Entrada
          </Button>

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
