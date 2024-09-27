import React, { useState } from 'react';
import {
  Button,
  Modal,
  Box,
  Typography,
  IconButton,
  TextField,
  InputLabel,
  Select,
  FormControl,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { criaSaida } from '@/services/saidas/saidasServices';

const getErrorMessage = (error: any): string | undefined => {
  if (!error) return undefined;
  if (typeof error.message === 'string') {
    return error.message;
  }
  return undefined;
};

export const ModalSaida: React.FC = () => {
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
      await criaSaida(data, file);
      console.log('Saída criada com sucesso');
      handleClose();
      reset();
    } catch (error) {
      console.error('Erro ao criar saída:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Nova Saída
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style} component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Criar Saída
          </Typography>

          <TextField
            label="Nome da Saída"
            {...register('nomeSaida', { required: 'Nome da Saída é obrigatório' })}
            error={!!errors.nomeSaida}
            helperText={getErrorMessage(errors.nomeSaida)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Tipo de Saída"
            {...register('tipoSaida', { required: 'Tipo de Saída é obrigatório' })}
            error={!!errors.tipoSaida}
            helperText={getErrorMessage(errors.tipoSaida)}
            fullWidth
            margin="normal"
          />
          
          <NumericFormat
            customInput={TextField}
            label="Valor da Saída"
            fullWidth
            margin="normal"
            decimalSeparator=","
            thousandSeparator="."
            prefix="R$ "
            decimalScale={2}
            fixedDecimalScale
            allowNegative={false}
            error={!!errors.valorSaida}
            helperText={getErrorMessage(errors.valorSaida)}
            {...register('valorSaida', { required: 'Valor da Saída é obrigatório' })}
            onValueChange={(values) => {
              const { floatValue } = values;
              if (floatValue !== undefined) {
                setValue('valorSaida', floatValue);
              } else {
                setValue('valorSaida', '');
              }
            }}
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

          <TextField
            label="Data de Vencimento"
            type="date"
            InputLabelProps={{ shrink: true }}
            {...register('dataVencimento', { required: 'Data de Vencimento é obrigatória' })}
            error={!!errors.dataVencimento}
            helperText={getErrorMessage(errors.dataVencimento)}
            fullWidth
            margin="normal"
          />

          <InputLabel sx={{ mt: 2 }}>Recibo da Saída</InputLabel>
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={handleFileChange}
            style={{ marginTop: '8px' }}
          />
          
          <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
            Criar Saída
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
