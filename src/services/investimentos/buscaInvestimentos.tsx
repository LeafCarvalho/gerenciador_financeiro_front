import axios from 'axios';

const BuscaInvestimentos = async (): Promise<any[]> => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}investimentos`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data
    } catch (error) {
        console.error('Erro ao buscar investimentos:', error);
        throw error;
    }
}

export default BuscaInvestimentos