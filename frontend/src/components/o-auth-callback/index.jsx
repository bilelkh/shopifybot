import React, { useEffect } from 'react';

const OAuthCallback = () => {
    useEffect(() => {
        // Function to extract token from query parameters
        const getAccessTokenFromQueryParams = () => {
            const params = new URLSearchParams(window.location.search);
            const accesstoken = params.get('accesstoken');
            return accesstoken;
        };

        // Get the token from query parameters
        const accesstoken = getAccessTokenFromQueryParams();

        if (accesstoken) {
            // Save the token to localStorage
            localStorage.setItem('accessToken', accesstoken);

            // Redirect the user to a secure route or the main app after saving the token
            // Replace '/dashboard' with the desired route
            window.location.href = '/dashboard';
        } else {
            // Handle the case where the token is missing or invalid
            // Redirect the user to an error page or show an error message
            // Replace '/error' with the desired error route
            window.location.href = '/error';
        }
    }, []);

    // Render a loading message or UI while the token is being processed
    return <div>Loading...</div>;
};

export default OAuthCallback;
