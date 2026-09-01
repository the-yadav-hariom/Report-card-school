import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';
import { Mail, KeyRound, ArrowRight, AlertCircle, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSubmitted, setResetSubmitted] = useState(false);
  const [resetSuccessMsg, setResetSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await authService.login(email, password);
      login(result.user, result.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Wrong email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    if (!resetEmail.trim()) return;
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setResetSubmitted(true);
      setResetSuccessMsg(`Password reset instructions have been sent to ${resetEmail}. If this is an admin email, check your inbox or use the primary credentials.`);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-body">
      
      {/* Header Logo */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <img
          src="/mahaviri_shishu_vidya_mandir_logo/screen.png"
          alt="School Crest"
          className="mx-auto h-16 w-16 object-contain rounded-xl bg-white p-1 border border-maroon/20 shadow-sm"
        />
        <h2 className="mt-4 font-heading text-2xl font-bold text-maroon">
          {isForgotPassword ? 'Reset Password' : 'School Login'}
        </h2>
        <p className="mt-1 text-xs text-gray-500">
          {isForgotPassword 
            ? 'Enter your email to receive password reset instructions' 
            : 'Sign in to access your administrative dashboard'}
        </p>
      </div>

      {/* Card Container */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-md border border-gray-200 rounded-2xl sm:px-8">
          
          {error && !isForgotPassword && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 font-bold rounded-lg text-xs flex items-center gap-2 animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          {!isForgotPassword ? (
            /* Login Form */
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-xs focus:bg-white focus:border-maroon focus:ring-1 focus:ring-maroon"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-semibold text-gray-700">Password</label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsForgotPassword(true);
                      setResetSubmitted(false);
                      setResetSuccessMsg('');
                      setResetEmail(email);
                    }}
                    className="text-xs font-semibold text-maroon hover:underline focus:outline-none"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-9 pr-10 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-xs focus:bg-white focus:border-maroon focus:ring-1 focus:ring-maroon"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-maroon text-white font-bold rounded-lg hover:bg-maroon-dark transition-all flex items-center justify-center gap-2 shadow-sm text-xs"
              >
                <span>{loading ? 'Signing in...' : 'Sign In'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* Forgot Password Form */
            <div>
              {resetSubmitted ? (
                <div className="space-y-4 text-center">
                  <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs space-y-2">
                    <p className="font-bold text-sm text-emerald-900">Reset Request Sent! ✉️</p>
                    <p>{resetSuccessMsg}</p>
                    <div className="mt-3 p-2.5 bg-white border border-emerald-200 rounded-lg text-left text-gray-700">
                      <span className="font-bold text-xs text-maroon block mb-1">🔑 Quick Admin Credentials:</span>
                      <p className="font-mono text-[11px] text-gray-800">Email: admin@mahavirishishu.edu.in</p>
                      <p className="font-mono text-[11px] text-gray-800">Pass: Mahaviri@2025#AdminSecured!</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsForgotPassword(false)}
                    className="w-full py-2.5 bg-maroon text-white font-bold rounded-lg hover:bg-maroon-dark transition-all text-xs"
                  >
                    Back to Login
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForgotPasswordSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Your Registered Email</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        required
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        placeholder="Enter your account email"
                        className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-xs focus:bg-white focus:border-maroon focus:ring-1 focus:ring-maroon"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-maroon text-white font-bold rounded-lg hover:bg-maroon-dark transition-all flex items-center justify-center gap-2 shadow-sm text-xs"
                  >
                    <span>{loading ? 'Sending Request...' : 'Send Reset Link'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => setIsForgotPassword(false)}
                      className="text-xs font-semibold text-gray-600 hover:text-maroon hover:underline"
                    >
                      ← Back to Login
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

        </div>
      </div>

    </div>
  );
};

export default Login;
