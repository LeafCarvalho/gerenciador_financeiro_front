import axios from 'axios';

const BuscaSaidas = async (): Promise<any[]> => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}saidas`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data
    } catch (error) {
        console.error('Erro ao buscar saidas:', error);
        throw error;
    }
}

export default BuscaSaidas