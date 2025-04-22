
import { useEffect, useState } from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import {API} from "../services/client.jsx";


export const ProtectedRoute = ({ children })=> {
    const [checking, setChecking] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {

            navigate('/', { replace: true });
            return;
        }

        // verify it with the backend
        API.get('/auth/status')
            .then(() => {
                setChecking(false);
            })
            .catch(() => {
                // bad token → clear & re‑login
                localStorage.removeItem('token');
                navigate('/', { replace: true });
            });
    }, [navigate]);


    if (checking) return null;


    return children;
}
