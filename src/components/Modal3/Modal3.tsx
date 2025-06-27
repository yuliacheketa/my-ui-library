import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

// --- Анімації ---

const glitch1 = keyframes`
  0% {
    clip: rect(24px, 9999px, 56px, 0);
    transform: translate(-2px, -2px);
  }
  20% {
    clip: rect(56px, 9999px, 85px, 0);
    transform: translate(2px, 0);
  }
  40% {
    clip: rect(10px, 9999px, 35px, 0);
    transform: translate(-2px, 2px);
  }
  60% {
    clip: rect(35px, 9999px, 65px, 0);
    transform: translate(2px, -2px);
  }
  80% {
    clip: rect(50px, 9999px, 75px, 0);
    transform: translate(-2px, 0);
  }
  100% {
    clip: rect(24px, 9999px, 56px, 0);
    transform: translate(0, 0);
  }
`;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 8px #0ff, 0 0 12px #0ff;
  }
  50% {
    box-shadow: 0 0 15px #0ff, 0 0 25px #0ff;
  }
  100% {
    box-shadow: 0 0 8px #0ff, 0 0 12px #0ff;
  }
`;

const fadeInScale = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.75) rotate(-1deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0);
  }
`;

const fadeOutScale = keyframes`
  0% {
    opacity: 1;
    transform: scale(1) rotate(0);
  }
  100% {
    opacity: 0;
    transform: scale(0.75) rotate(-1deg);
  }
`;

// --- Стилі ---

const Overlay = styled.div<{ isClosing: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(10, 10, 15, 0.95);
  backdrop-filter: blur(12px);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${({ isClosing }) => (isClosing ? fadeOutScale : fadeInScale)} 0.4s ease forwards;
  z-index: 1300;
  cursor: ${({ isClosing }) => (isClosing ? 'default' : 'pointer')};
`;

const ModalWrapper = styled.div<{ isClosing: boolean }>`
  background: rgba(10, 20, 30, 0.75);
  border-radius: 24px;
  padding: 3rem 3.5rem;
  max-width: 580px;
  width: 95%;
  position: relative;
  box-shadow:
    0 0 30px #0ff,
    inset 0 0 25px #00fff9cc,
    0 10px 60px #00ffe9cc;
  color: #00ffffcc;
  font-family: 'Orbitron', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-shadow:
    0 0 8px #00fff7aa,
    0 0 16px #00fff7cc;
  animation: ${({ isClosing }) => (isClosing ? fadeOutScale : fadeInScale)} 0.4s ease forwards;
  cursor: auto;
  user-select: text;

  &:before, &:after {
    content: '';
    position: absolute;
    top: 5%;
    left: 5%;
    width: 90%;
    height: 90%;
    border-radius: 24px;
    pointer-events: none;
    mix-blend-mode: screen;
  }
  &:before {
    border: 1.5px solid #00ffff55;
    filter: blur(3px);
    animation: ${glitch1} 2.5s infinite linear alternate-reverse;
  }
  &:after {
    border: 2.5px solid #00fffccc;
    filter: blur(8px);
    animation: ${glitch1} 3.2s infinite linear alternate;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 18px;
  right: 18px;
  background: transparent;
  border: none;
  font-size: 2.3rem;
  color: #00ffffaa;
  cursor: pointer;
  transition: color 0.3s ease, text-shadow 0.3s ease;

  &:hover {
    color: #00ffff;
    text-shadow:
      0 0 12px #00ffff,
      0 0 20px #00ffffcc,
      0 0 30px #00ffffdd;
  }

  &:focus {
    outline: none;
  }
`;

const Title = styled.h2`
  margin: 0 0 1.7rem 0;
  font-weight: 700;
  font-size: 2.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #00ffffee;
  text-shadow:
    0 0 6px #00fff7ff,
    0 0 16px #00fff7ff;
  user-select: none;
`;

const Content = styled.div`
  font-size: 1.2rem;
  line-height: 1.7;
  color: #00fffccc;
`;

const ActionButton = styled.button`
  margin-top: 2.5rem;
  padding: 0.85rem 2.5rem;
  font-size: 1.15rem;
  font-weight: 700;
  color: #000;
  background: #00ffff;
  border: none;
  border-radius: 35px;
  cursor: pointer;
  box-shadow: 0 0 10px #00ffffaa;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  animation: ${pulse} 2.8s infinite ease-in-out;

  &:hover {
    box-shadow: 0 0 24px #00ffffdd, 0 0 38px #00ffffee;
    transform: scale(1.07);
  }

  &:focus {
    outline: none;
  }
`;

// --- Компонент ---

type Modal3Props = {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  onAction?: () => void;
  actionLabel?: string;
};

const Modal3: React.FC<Modal3Props> = ({ isOpen, onClose, title, children, onAction, actionLabel }) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsClosing(false);
      document.body.style.overflow = 'hidden';
    } else if (isVisible) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setIsClosing(false);
        document.body.style.overflow = 'auto';
      }, 400);
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
        {onAction && actionLabel && (
          <ActionButton onClick={onAction}>{actionLabel}</ActionButton>
        )}
      </ModalWrapper>
    </Overlay>
  );
};

export default Modal3;
