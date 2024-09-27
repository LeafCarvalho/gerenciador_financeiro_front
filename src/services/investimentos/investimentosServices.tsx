import axios from 'axios';

export const BuscaInvestimentos = async (): Promise<any[]> => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}investimentos`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data;
};

export const DeletaInvestimento = async (id: number): Promise<void> => {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}investimentos/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
};

export const criaInvestimento = async (dadosInvestimento: any, file: File | null): Promise<void> => {
    const token = localStorage.getItem('token');
    const baseURL = process.env.NEXT_PUBLIC_API_URL;

    const formData = new FormData();
    Object.keys(dadosInvestimento).forEach((key) => formData.append(key, dadosInvestimento[key]));

    if (file) {
        formData.append('reciboInvestimento', file);
    }

    await axios.post(`${baseURL}investimentos`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
