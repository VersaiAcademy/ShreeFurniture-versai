import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        const uid = params.get('uid');

        if (!token) {
          navigate('/login');
          return;
        }

        // Save token and uid
        localStorage.setItem('token', token);
        if (uid) localStorage.setItem('id', uid);

        // Try to fetch user info and persist basic profile fields
        try {
          const resp = await axios.get('/api/auth/me');
          if (resp?.data?.user) {
            const u = resp.data.user;
            if (u.username) localStorage.setItem('username', u.username);
            if (u.email) localStorage.setItem('email', u.email);
            if (u.first_name) localStorage.setItem('first_name', u.first_name);
          }
        } catch (err) {
          // ignore - token may be valid but /me might fail temporarily
          console.warn('Could not fetch user profile after OAuth', err?.message || err);
        }

        // Remove token from URL for cleanliness
        try {
          const newUrl = window.location.origin + window.location.pathname;
          window.history.replaceState({}, document.title, newUrl);
        } catch (e) {
          // ignore
        }

        // Redirect user to profile
        navigate('/userprofile');
      } catch (error) {
        console.error('OAuth callback handling failed', error);
        navigate('/login');
      }
    })();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">Signing you in... Please wait.</div>
    </div>
  );
};

export default OAuthCallback;
