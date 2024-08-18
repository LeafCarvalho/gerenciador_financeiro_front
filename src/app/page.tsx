"use client";

import { useState } from 'react';
import { Box, Button, Container, FormControl, Input, InputLabel, IconButton, InputAdornment } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [dadosUsuario, setDadosUsuario] = useState<Object>({});
  const [exibeSenha, setExibeSenha] = useState<boolean>(false);
  const router = useRouter();

  const handleClickShowPassword = () => setExibeSenha(!exibeSenha);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}auth/login`, {
        email: email,
        senha: senha
      });
      const dataUser = response.data;
      setDadosUsuario(dataUser);
      router.push('/dashboard');
    } catch (error) {
      console.error('Erro ao realizar login:', error);
    }
  };

  return (
    <>
      <Header />
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
                  >
                    {exibeSenha ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Button variant="contained" type="submit" style={{ backgroundColor:"#4CAF50" }}>
            Login
          </Button>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
