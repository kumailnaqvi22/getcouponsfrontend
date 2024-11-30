import React, { useState, useEffect } from 'react';
import "./ManageUser.css"; 

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token'); // Assume token is stored in localStorage
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/users`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();
                if (response.ok) {
                    setUsers(data);
                } else {
                    alert(data.message || 'Failed to fetch users');
                }
            } catch (error) {
                console.error('Error:', error.message);
                alert('Failed to fetch users');
            }
        };
        fetchUsers();
    }, []);

    const handleUserClick = (user) => {
        setSelectedUser(user);
        setShowDropdown(true);
    };

    const handleToggleAdmin = async () => {
        try {
            const token = localStorage.getItem('token');
            const updatedRole = selectedUser.isAdmin ? 'user' : 'admin';
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/users/${selectedUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ isAdmin: !selectedUser.isAdmin }) // Toggle isAdmin value
            });
            const data = await response.json();
            if (response.ok) {
                setUsers(users.map(user => user._id === selectedUser._id ? data : user));
                setShowDropdown(false);
            } else {
                alert(data.message || 'Failed to update user');
            }
        } catch (error) {
            console.error('Error:', error.message);
            alert('Failed to update user');
        }
    };

    const handleDeleteUser = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/users/${selectedUser._id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (response.ok) {
                setUsers(users.filter(user => user._id !== selectedUser._id));
                setShowDropdown(false);
            } else {
                alert(data.message || 'Failed to delete user');
            }
        } catch (error) {
            console.error('Error:', error.message);
            alert('Failed to delete user');
        }
    };

    return (
        <div className="manage-users">
            <h1>Manage Users</h1>
            <ul>
                {users.map(user => (
                    <li key={user._id} onClick={() => handleUserClick(user)}>
                        {user.email}
                    </li>
                ))}
            </ul>
            {showDropdown && selectedUser && (
                <div className="dropdown">
                    <button onClick={handleDeleteUser}>Delete User</button>
                    <button onClick={handleToggleAdmin}>
                        {selectedUser.isAdmin ? 'Make Normal User' : 'Make Admin'}
                    </button>
                </div>
            )}
        </div>
    );
}

export default ManageUsers;