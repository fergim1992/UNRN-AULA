import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

const Toast = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    typeof window !== 'undefined'
      ? getWindowDimensions()
      : { width: 0, height: 0 },
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const Toast = Swal.mixin({
    toast: true,
    position: windowDimensions.width > 900 ? 'bottom-end' : 'bottom',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  return Toast;
};

export default Toast;
