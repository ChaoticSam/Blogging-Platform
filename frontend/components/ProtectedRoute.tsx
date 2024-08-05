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
        return <p>Loading...</p>; // You can replace this with a proper loading spinner or component
    }

    return <>{children}</>;
};

export default ProtectedRoute;
