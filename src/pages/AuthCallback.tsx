import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { ThunkGoogle } from '../store/slices/userSlice';
import { useAppDispatch } from '../store/hooks/hooks';

const AuthCallback = () => {
  const dispatch = useAppDispatch();
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
