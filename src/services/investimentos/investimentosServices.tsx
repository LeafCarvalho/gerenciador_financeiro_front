import axios from 'axios';

export const BuscaInvestimentos = async (): Promise<any[]> => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}investimentos`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data
}