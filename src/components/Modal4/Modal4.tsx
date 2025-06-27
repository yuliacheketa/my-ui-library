import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const backdropFadeIn = keyframes`
  from {
    opacity: 0;
    backdrop-filter: blur(0);
  }
  to {
    opacity: 0.85;
    backdrop-filter: blur(6px);
  }
`;

const modalPopIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(50px) scale(0.75);
    box-shadow: 0 0 0 rgba(0,0,0,0);
  }
  60% {
    opacity: 1;
    transform: translateY(-10px) scale(1.05);
    box-shadow: 0 8px 30px rgba(0,150,255,0.4);
  }
  100% {
    transform: translateY(0) scale(1);
    box-shadow: 0 15px 60px rgba(0,150,255,0.6);
  }
`;

const pulseGlow = keyframes`
  0%, 100% {
    box-shadow:
      0 0 10px rgba(0,150,255,0.6),
      0 0 20px rgba(0,150,255,0.4);
  }
  50% {
    box-shadow:
      0 0 20px rgba(0,200,255,0.9),
      0 0 30px rgba(0,200,255,0.7);
  }
`;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(10, 10, 25, 0.85);
  backdrop-filter: blur(6px); /* блюр фону */
  opacity: 0;
  animation: ${backdropFadeIn} 0.4s forwards;
  z-index: 9998;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 440px;
  max-width: 90vw;
  background: linear-gradient(135deg, #001f4d, #004080);
  border-radius: 18px;
  padding: 30px 40px;
  transform-origin: center;
  transform-style: preserve-3d;
  animation: ${modalPopIn} 0.5s forwards;
  box-shadow: 0 10px 40px rgba(0, 64, 128, 0.8);
  color: #e6f0ff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: center;
  user-select: none;
  z-index: 9999; /* вище за Backdrop */
  /* ОБОВ'ЯЗКОВО НІЯКОГО backdrop-filter тут */
`;


const Title = styled.h2`
  margin: 0 0 15px;
  font-size: 1.8rem;
  font-weight: 700;
  color: #d6e9ff; /* Чіткий світлий заголовок */
  text-shadow: none; /* Без тіні */
`;

const Content = styled.div`
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 25px;
  color: #cbdcff; /* Чіткий текст без блюру */
`;
const Button = styled.button`
  background: #0099ff;
  border: none;
  padding: 14px 32px;
  border-radius: 40px;
  font-weight: 700;
  font-size: 1.1rem;
  color: white;
  cursor: pointer;
  box-shadow:
    0 0 20px #0099ffcc,
    0 0 40px #007acccc;
  transition: all 0.3s ease;
  animation: ${pulseGlow} 3s infinite ease-in-out;

  &:hover {
    background: #33b3ff;
    box-shadow:
      0 0 35px #33b3ffcc,
      0 0 60px #33b3ffcc;
    transform: scale(1.05);
  }
  &:focus {
    outline: none;
    box-shadow:
      0 0 45px #33ccff,
      0 0 80px #33ccff;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 18px;
  right: 20px;
  background: transparent;
  border: none;
  font-size: 1.6rem;
  color: #99ccffee; /* світлий колір хрестика */
  cursor: pointer;
  transition: color 0.25s ease;

  &:hover {
    color: #33b3ff;
  }
  &:focus {
    outline: none;
  }
`;


type Modal4Props = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
};

const Modal4: React.FC<Modal4Props> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <Backdrop onClick={onClose} />
      <ModalContainer role="dialog" aria-modal="true" aria-labelledby="modal4-title">
        <CloseButton aria-label="Закрити модалку" onClick={onClose}>&times;</CloseButton>
        {title && <Title id="modal4-title">{title}</Title>}
        <Content>{children}</Content>
        <Button onClick={onClose}>Закрити</Button>
      </ModalContainer>
    </>
  );
};

export default Modal4;
