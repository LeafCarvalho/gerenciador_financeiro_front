import axios from 'axios';

export const criaEntrada = async (data: any, file: File | null): Promise<void> => {
    const token = localStorage.getItem('token');
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    
    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));
    
    if (file) {
        formData.append('reciboEntrada', file);
    }

    await axios.post(`${baseURL}entradas`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const buscaEntradas = async (): Promise<any[]> => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}entradas`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data;
};

export const deletaEntrada = async (id: number): Promise<void> => {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}entradas/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
};