import { useEffect } from 'react';
import { siteConfig } from '../data/config';

const RedirectPage = () => {
    useEffect(() => {
        // Redirección inmediata al montar el componente
        if (siteConfig.qrRedirectUrl) {
            window.location.href = siteConfig.qrRedirectUrl;
        }
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
            <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ce1616] mx-auto mb-4"></div>
                <p className="text-slate-500 font-merriweather">Redirigiendo...</p>
            </div>
        </div>
    );
};

export default RedirectPage;
