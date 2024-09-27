import axios from 'axios';

export const criaSaida = async (dadosSaida: any, file: File | null): Promise<void> => {
    const token = localStorage.getItem('token');
    const baseURL = process.env.NEXT_PUBLIC_API_URL;

    const formData = new FormData();
    Object.keys(dadosSaida).forEach((key) => formData.append(key, dadosSaida[key]));

    if (file) {
        formData.append('reciboSaida', file);
    }

    await axios.post(`${baseURL}saidas`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const BuscaSaidas = async (): Promise<any[]> => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}saidas`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data
}

export const DeletaSaida = async (id: number): Promise<void> => {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}saidas/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
};