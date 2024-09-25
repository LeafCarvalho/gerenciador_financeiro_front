"use client";

import { Header } from '../components/header/header';
import { Footer } from '../components/footer/footer';
import { InfosUsuario } from '../components/infosUsuario/infosUsuario';
import { Button, Box } from '@mui/material'; // Importar os componentes do Material UI
import { useRouter } from 'next/navigation'; // Para redirecionamento
import React from 'react';

const Dashboard = () => {
    const router = useRouter();
    
    // Função de logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('nome');
        router.push('/');
    };
    
    return (
        <>
            <Header />
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                <InfosUsuario />
                <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={handleLogout} 
                    style={{ marginTop: '20px' }}
                >
                    Sair
                </Button>
            </Box>
            <Footer />
        </>
    );
};

export default Dashboard;
