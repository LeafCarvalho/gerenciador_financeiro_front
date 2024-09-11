import BuscaInvestimentos from '@/services/investimentos/buscaInvestimentos';
import React, { useEffect, useState } from 'react'

export const Investimentos = () => {
    const [investimentos, setInvestimentos] = useState<any[]>([]);

    const carregarInvestimentos = async () => {
        try {
            const dataInvestimentos = await BuscaInvestimentos();
            setInvestimentos(dataInvestimentos);
        } catch (error) {
            console.error('Erro ao carregar entradas:', error);
        }
    };

    useEffect(() => {
        carregarInvestimentos();
    }, []);

  return (
    <div>
        <h2>Investimentos:</h2>
        <ul>
            {investimentos.map((investimento, index) => (
                <li key={index}>
                    <div>
                        <p>{investimento.nomeInvestimento}</p>
                        <p>{investimento.tipoInvestimento} </p>
                        <p>{investimento.tipoRecorrencia}</p>
                    </div>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Investimentos