// UserProfile.js
import React, { useState, useEffect, useCallback } from 'react';
import fetchWithAuth from '../../utils/fetchWithAuth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './UserProfile.module.css';

const UserProfile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUserData = useCallback(async () => {
        try {
            const response = await fetchWithAuth('/api/users/profile');
            if (response.ok) {
                const data = await response.json();
                setUserData(data);
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || 'Failed to fetch user data');
            }
        } catch (error) {
            toast.error('Failed to fetch user data');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);

    if (loading) {
        return <div className={styles.loading}>Loading...</div>;
    }

    if (!userData) {
        return <div className={styles.error}>Error fetching user data</div>;
    }

    return (
        <div className={styles.userProfileContainer}>
            <h1>User Profile</h1>
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Email:</strong> {userData.email}</p>
        </div>
    );
};

export default UserProfile;
