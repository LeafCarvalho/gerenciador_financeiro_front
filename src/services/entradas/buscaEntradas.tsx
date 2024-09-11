import axios from 'axios';

export const buscaEntradas = async (): Promise<any[]> => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}entradas`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar entradas:', error);
        throw error;
    }
};
