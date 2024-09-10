import { useState, useEffect } from 'react';
import { Box, Button, Container, FormControl, Input, InputLabel, IconButton, InputAdornment, FormControlLabel, Checkbox } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface ResponseUsuario {
  token: string;
  username: string;
}

export const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [exibeSenha, setExibeSenha] = useState<boolean>(false);
  const [lembrarMe, setLembrarMe] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const emailArmazenado = localStorage.getItem('email');
    const senhaArmazenada = localStorage.getItem('senha');
    if (emailArmazenado && senhaArmazenada) {
      setEmail(emailArmazenado);
      setSenha(senhaArmazenada);
      setLembrarMe(true);
    }
  }, []);

  const handleClickShowPassword = () => setExibeSenha(!exibeSenha);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try {
      const response = await axios.post<ResponseUsuario>(`${process.env.NEXT_PUBLIC_API_URL}auth/login`, {
        email: email,
        senha: senha
      });
      const dataUser = response.data;
      localStorage.setItem('token', dataUser.token);
      
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

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLembrarMe(event.target.checked);
  };

  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        component="form"
        onSubmit={handleLogin}
        display="flex"
        flexDirection="column"
        width="350px"
        gap={2}
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
          control={
            <Checkbox
              checked={lembrarMe}
              onChange={handleCheckboxChange}
              name="lembrarMe"
            />
          }
          label="Lembrar-me"
        />
        <Button variant="contained" type="submit" style={{ backgroundColor: "#4CAF50" }}>
          Login
        </Button>
      </Box>
    </Container>
  );
};
