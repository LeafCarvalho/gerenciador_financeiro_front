
import { buscaEntradas } from '@/services/entradas/buscaEntradas';
import { useEffect, useState } from 'react'

export const Entradas = () => {
    const [entradas, setEntradas] = useState<any[]>([]);

    const carregarEntradas = async () => {
        try {
            const dataEntradas = await buscaEntradas();
            setEntradas(dataEntradas);
        } catch (error) {
            console.error('Erro ao carregar entradas:', error);
        }
    };

    useEffect(() => {
        carregarEntradas();
    }, []);

  return (
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
  )
}