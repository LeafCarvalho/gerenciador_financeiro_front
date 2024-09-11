"use client";

import { Header } from '../components/header/header';
import { Footer } from '../components/footer/footer';
import { InfosUsuario } from '../components/infosUsuario/infosUsuario';

const Dashboard = () => {


    return (
        <>
            <Header />
                <InfosUsuario />
            <Footer />
        </>
    );
};

export default Dashboard;
