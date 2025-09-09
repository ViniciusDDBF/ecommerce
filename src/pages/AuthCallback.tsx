import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import type { AppDispatch } from '../store/store';
import { ThunkGoogle } from '../store/slices/userSlice';

const AuthCallback = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const didRunRef = useRef(false);

  useEffect(() => {
    if (didRunRef.current) return;
    didRunRef.current = true;

    dispatch(ThunkGoogle()).finally(() => {
      window.history.replaceState({}, document.title, window.location.pathname);
      navigate('/');
    });
  }, [dispatch, navigate]);

  return null;
};

export default AuthCallback;
