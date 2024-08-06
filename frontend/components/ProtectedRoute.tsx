import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { isAuthenticated } from '../utils/auth';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (!isAuthenticated()) {
                router.push('/login');
            } else {
                setLoading(false);
            }
        }
    }, [router]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
