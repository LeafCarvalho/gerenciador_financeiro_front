"use client";

import React, { useEffect, useState } from 'react';
import { Header } from '../components/header/header';
import { Footer } from '../components/footer/footer';
import axios from 'axios';

const Dashboard = () => {
    const [entradas, setEntradas] = useState<any[]>([]);

    const buscaEntradas = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}entradas`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            const dataEntradas = response.data;
            setEntradas(dataEntradas);
        } catch (error) {
            console.error('Erro ao buscar entradas:', error);
        }
    };

    useEffect(() => {
        buscaEntradas();
    }, []);

    return (
        <>
            <Header />
            <div>
                <h2>Entradas:</h2>
                <ul>
                    {entradas.map((entrada, index) => (
                        <li key={index}>
                            <div>
                                <p>{entrada.nomeEntrada}</p>
                                <p>{entrada.tipoEntrada} </p>
                                <p>{entrada.tipoRecorrencia}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <Footer />
        </>
    );
};

export default Dashboard;
