import axios from 'axios';

export const BuscaSaidas = async (): Promise<any[]> => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}saidas`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data
}