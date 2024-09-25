import { useEffect, useState } from 'react';
import { Box, Button, Container, FormControl, Input, InputLabel, IconButton, InputAdornment, FormControlLabel, Checkbox, Typography, TextField, Snackbar, Alert } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Fade from '@mui/material/Fade';

export const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [exibeSenha, setExibeSenha] = useState<boolean>(false);
  const [lembrarMe, setLembrarMe] = useState<boolean>(false);
  const [mostrarCadastro, setMostrarCadastro] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const router = useRouter();
  const [nome, setNome] = useState<string | null>(null);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    const nomeSalvo = localStorage.getItem('nome');
    if (nomeSalvo) {
      setNome(nomeSalvo);
    }
  }, []);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}auth/login`, {
        email: email,
        senha: senha
      });
      const dataUser = response.data;
      
      localStorage.setItem('token', dataUser.token);
      localStorage.setItem('nome', dataUser.name); 
      localStorage.setItem('id', dataUser.id);
      
      setNome(dataUser.name);

      if (lembrarMe) {
        localStorage.setItem('email', email);
        localStorage.setItem('senha', senha);
      } else {
        localStorage.removeItem('email');
        localStorage.removeItem('senha');
      }

      router.push('/dashboard');
    } catch (error) {
      console.error('Erro ao realizar login:', error);
    }
  };

  const handleCadastro = async (data: any) => {
    try {
      const dataWithRole = { ...data, role: 'USER' };
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}auth/register`, dataWithRole);
      
      setSnackbarMessage('Cadastro realizado com sucesso!');
      setOpenSnackbar(true);
      setMostrarCadastro(false);
    } catch (error) {
      console.error('Erro ao realizar cadastro:', error);
      setSnackbarMessage('Erro ao realizar cadastro. Tente novamente.');
      setOpenSnackbar(true);
    }
  };

  const handleClickShowPassword = () => setExibeSenha(!exibeSenha);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLembrarMe(event.target.checked);
  };

  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '38vh',
      }}
    >
      <Fade in={!mostrarCadastro}>
        <Box
          component="form"
          onSubmit={handleLogin}
          display={mostrarCadastro ? 'none' : 'flex'}
          flexDirection="column"
          width="350px"
          gap={2}
          style={{ position: 'absolute' }}
        >
          <FormControl variant="standard">
            <InputLabel htmlFor="email-input">Email</InputLabel>
            <Input
              id="email-input"
              aria-describedby="email-helper-text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </FormControl>
          <FormControl variant="standard">
            <InputLabel htmlFor="password-input">Senha</InputLabel>
            <Input
              id="password-input"
              aria-describedby="password-helper-text"
              type={exibeSenha ? 'text' : 'password'}
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {exibeSenha ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControlLabel
            control={<Checkbox checked={lembrarMe} onChange={handleCheckboxChange} name="lembrarMe" />}
            label="Lembrar-me"
          />
          <Button variant="contained" type="submit" style={{ backgroundColor: "#4CAF50" }}>
            Login
          </Button>
          <Typography variant="body2" align="center" sx={{ marginTop: '1rem', cursor: 'pointer' }} onClick={() => setMostrarCadastro(true)}>
            Não tem cadastro? <strong>Clique aqui.</strong>
          </Typography>
        </Box>
      </Fade>

      <Fade in={mostrarCadastro}>
        <Box
          component="form"
          onSubmit={handleSubmit(handleCadastro)}
          display={mostrarCadastro ? 'flex' : 'none'}
          flexDirection="column"
          width="350px"
          gap={2}
          style={{ position: 'absolute' }}
        >
          <TextField
            label="Nome de usuário"
            variant="standard"
            {...register('username', { required: true })}
          />
          <TextField
            label="Email"
            variant="standard"
            {...register('email', { required: true })}
          />
          <FormControl variant="standard">
            <InputLabel htmlFor="password-input">Senha</InputLabel>
            <Input
              id="password-input"
              aria-describedby="password-helper-text"
              type={exibeSenha ? 'text' : 'password'}
              {...register('senha', { required: true })}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {exibeSenha ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Button variant="contained" type="submit" style={{ backgroundColor: "#4CAF50" }}>
            Cadastrar
          </Button>
          <Typography variant="body2" align="center" sx={{ marginTop: '1rem', cursor: 'pointer' }} onClick={() => setMostrarCadastro(false)}>
            Já tem uma conta? <strong>Faça login.</strong>
          </Typography>
        </Box>
      </Fade>

      {/* Snackbar de sucesso ou erro */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};
