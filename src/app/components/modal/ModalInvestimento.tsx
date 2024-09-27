import React, { useState } from 'react';
import {
  Button,
  Modal,
  Box,
  Typography,
  IconButton,
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { criaInvestimento } from '@/services/investimentos/investimentosServices';

const getErrorMessage = (error: any): string | undefined => {
  if (!error) return undefined;
  if (typeof error.message === 'string') {
    return error.message;
  }
  return undefined;
};

export const ModalInvestimento: React.FC = () => {
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
      await criaInvestimento(data, file);
      console.log('Investimento criado com sucesso');
      handleClose();
      reset();
      window.location.reload();
    } catch (error) {
      console.error('Erro ao criar investimento:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Novo Investimento
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style} component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Typography variant="h6" component="h2">
            Criar Investimento
          </Typography>

          <TextField
            label="Nome do Investimento"
            {...register('nomeInvestimento', { required: 'Nome do Investimento é obrigatório' })}
            error={!!errors.nomeInvestimento}
            helperText={getErrorMessage(errors.nomeInvestimento)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Tipo de Investimento"
            {...register('tipoInvestimento', { required: 'Tipo de Investimento é obrigatório' })}
            error={!!errors.tipoInvestimento}
            helperText={getErrorMessage(errors.tipoInvestimento)}
            fullWidth
            margin="normal"
          />
          <NumericFormat
            customInput={TextField}
            label="Valor do Investimento"
            fullWidth
            margin="normal"
            decimalSeparator=","
            thousandSeparator="."
            prefix="R$ "
            decimalScale={2}
            fixedDecimalScale
            allowNegative={false}
            error={!!errors.valorInvestimento}
            helperText={getErrorMessage(errors.valorInvestimento)}
            {...register('valorInvestimento', { required: 'Valor do Investimento é obrigatório' })}
            onValueChange={(values) => {
              const { floatValue } = values;
              if (floatValue !== undefined) {
                setValue('valorInvestimento', floatValue);
              } else {
                setValue('valorInvestimento', '');
              }
            }}
          />
          <TextField
            label="Categoria"
            {...register('categoria', { required: 'Categoria é obrigatória' })}
            error={!!errors.categoria}
            helperText={getErrorMessage(errors.categoria)}
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
          <TextField
            label="Data Inicial"
            type="date"
            InputLabelProps={{ shrink: true }}
            {...register('dataInvestimentoInicial', { required: 'Data Inicial é obrigatória' })}
            error={!!errors.dataInvestimentoInicial}
            helperText={getErrorMessage(errors.dataInvestimentoInicial)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Data Final"
            type="date"
            InputLabelProps={{ shrink: true }}
            {...register('dataInvestimentoFinal', { required: 'Data Final é obrigatória' })}
            error={!!errors.dataInvestimentoFinal}
            helperText={getErrorMessage(errors.dataInvestimentoFinal)}
            fullWidth
            margin="normal"
          />
          <InputLabel sx={{ mt: 2 }}>Recibo do Investimento</InputLabel>
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={handleFileChange}
            style={{ marginTop: '8px' }}
          />
          <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
            Criar Investimento
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
