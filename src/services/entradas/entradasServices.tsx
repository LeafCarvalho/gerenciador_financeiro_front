import axios from 'axios';

export const buscaEntradas = async (): Promise<any[]> => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}entradas`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data;
};

export const criaEntrada = async (dadosEntrada: any): Promise<any> => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}entradas`, dadosEntrada, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};
