import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-40px) scale(0.92);
    filter: blur(3px);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
`;

const slideUp = keyframes`
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
  to {
    opacity: 0;
    transform: translateY(-40px) scale(0.92);
    filter: blur(3px);
  }
`;

const Overlay = styled.div<{ isClosing: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(10, 10, 30, 0.85);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${({ isClosing }) => (isClosing ? fadeOut : fadeIn)} 0.35s ease forwards;
  z-index: 1200;
  cursor: ${({ isClosing }) => (isClosing ? 'default' : 'pointer')};
`;

const ModalWrapper = styled.div<{ isClosing: boolean }>`
  background: linear-gradient(145deg, #1a1a2e, #16213e);
  border-radius: 20px;
  padding: 2.5rem 3rem;
  max-width: 560px;
  width: 95%;
  box-shadow:
    0 15px 40px rgba(0, 0, 0, 0.7),
    inset 0 0 20px rgba(255, 255, 255, 0.07);
  color: #e0e6f1;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  position: relative;
  animation: ${({ isClosing }) => (isClosing ? slideUp : slideDown)} 0.35s ease forwards;
  cursor: auto;
  user-select: text;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  // Паралаксний ефект на hover
  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow:
      0 30px 70px rgba(0, 0, 0, 0.9),
      inset 0 0 25px rgba(255, 255, 255, 0.1);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 18px;
  right: 18px;
  background: transparent;
  border: none;
  font-size: 1.8rem;
  color: #8899bb;
  cursor: pointer;
  transition: color 0.25s ease;

  &:hover {
    color: #5b6ef9;
    text-shadow: 0 0 12px #5b6ef9;
  }

  &:focus {
    outline: none;
  }
`;

const Title = styled.h2`
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-weight: 700;
  font-size: 2.2rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #a3b1ff;
  text-shadow: 0 0 6px #5b6ef9;
`;

const Content = styled.div`
  font-size: 1.15rem;
  line-height: 1.6;
  color: #c0c9ff;
`;

type Modal2Props = {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
};

const Modal2: React.FC<Modal2Props> = ({ isOpen, onClose, title, children }) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsClosing(false);
      document.body.style.overflow = 'hidden'; // Блокуємо скрол сторінки під модалкою
    } else if (isVisible) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setIsClosing(false);
        document.body.style.overflow = 'auto'; // Відновлюємо скрол
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isVisible]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isVisible) return null;

  return (
    <Overlay isClosing={isClosing} onClick={handleOverlayClick} aria-modal="true" role="dialog">
      <ModalWrapper isClosing={isClosing} tabIndex={-1}>
        <CloseButton aria-label="Закрити" onClick={onClose}>&times;</CloseButton>
        {title && <Title>{title}</Title>}
        <Content>{children}</Content>
      </ModalWrapper>
    </Overlay>
  );
};

export default Modal2;
