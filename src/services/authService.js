import api from './api';

export const authService = {
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      // Hard credentials check for offline/demo mode
      const cleanEmail = (email || '').trim().toLowerCase();
      const cleanPass = (password || '').trim();

      const validAccounts = [
        { email: 'admin@mahavirishishu.edu.in', pass: 'Mahaviri@2025#AdminSecured!', name: 'Dr. Rajan Kumar' },
        { email: 'admin@academicexcellence.edu', pass: 'admin123', name: 'Dr. Rajan Kumar' }
      ];

      const match = validAccounts.find(acc => acc.email.toLowerCase() === cleanEmail && acc.pass === cleanPass);

      if (match) {
        return {
          token: 'jwt-token-admin-' + Date.now(),
          user: {
            name: match.name,
            email: match.email,
            schoolName: 'MAHAVIRI SHISHU VIDYA MANDIR',
            role: 'ADMIN'
          }
        };
      }

      throw new Error('Wrong email or password');
    }
  }
};

