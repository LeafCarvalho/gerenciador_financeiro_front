import BuscaSaidas from '@/services/saidas/buscaSaidas';
import React, { useEffect, useState } from 'react'

const Saidas = () => {
    const [saidas, setSaidas] = useState<any[]>([]);

    const carregarSaidas = async () => {
        try {
            const dataEntradas = await BuscaSaidas();
            setSaidas(dataEntradas);
        } catch (error) {
            console.error('Erro ao carregar saidas:', error);
        }
    };

    useEffect(() => {
        carregarSaidas();
    }, []);

  return (
    <div>
        <h2>Saídas:</h2>
        <ul>
            {saidas.map((saida, index) => (
                <li key={index}>
                    <div>
                        <p>{saida.nomeSaida}</p>
                        <p>{saida.tipoSaida} </p>
                        <p>{saida.tipoRecorrencia}</p>
                    </div>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Saidas