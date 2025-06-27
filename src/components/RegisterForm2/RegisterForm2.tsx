import React, { useState } from 'react';
import  { ThemeProvider } from 'styled-components';
import type { RegisterForm2Props } from './RegisterForm2.types';
import { lightTheme, darkTheme } from './theme';
import styled, { keyframes } from 'styled-components';


const ToggleTheme = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
  user-select: none;
  transition: transform 0.25s ease;

  &:hover {
    transform: rotate(15deg);
  }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
const Wrapper = styled.div`
  font-family: 'Inter', sans-serif;
  min-height: 100vh;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 1.5rem;
  transition: background 0.4s ease, color 0.4s ease;
`;

const FormCard = styled.div`
  background: ${({ theme }) => theme.card};
  padding: 3rem 2.5rem 2.5rem;
  border-radius: 20px;
  width: 100%;
  max-width: 480px;
  box-shadow:
    0 20px 30px rgba(231, 141, 177, 0.3),
    0 10px 15px rgba(231, 141, 177, 0.15);
  position: relative;
  animation: ${fadeInUp} 0.6s ease forwards;
`;

const Field = styled.div`
  position: relative;
  margin-bottom: 2rem;

  input {
    width: 100%;
    padding: 1.4rem 1rem 0.6rem;
    border: 2px solid ${({ theme }) => theme.border};
    border-radius: 12px;
    background: ${({ theme }) => theme.inputBg};
    color: ${({ theme }) => theme.text};
    font-size: 1.1rem;
    font-weight: 500;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
    box-shadow: inset 0 2px 6px rgb(0 0 0 / 0.03);

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.primary};
      box-shadow: 0 0 12px ${({ theme }) => theme.primary}88;
      background: ${({ theme }) => theme.background};
    }

    &:focus + label,
    &:not(:placeholder-shown) + label {
      top: 0.4rem;
      left: 1rem;
      font-size: 0.75rem;
      color: ${({ theme }) => theme.primary};
      font-weight: 700;
      opacity: 1;
      user-select: none;
      text-shadow: 0 0 5px ${({ theme }) => theme.primary}cc;
    }
  }

  label {
    position: absolute;
    top: 1.3rem;
    left: 1rem;
    font-size: 1rem;
    color: ${({ theme }) => theme.text}aa;
    opacity: 0.75;
    pointer-events: none;
    transition: all 0.3s ease;
    user-select: none;
  }
`;
const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2.5rem;
  letter-spacing: 0.04em;
  user-select: none;
`;

const SubmitBtn = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #f783ac 0%, #e45e8d 100%);
  color: white;
  font-weight: 700;
  padding: 1rem 1.2rem;
  font-size: 1.15rem;
  border: none;
  border-radius: 14px;
  margin-top: 1.5rem;
  cursor: pointer;
  box-shadow:
    0 5px 15px #e45e8d88;
  transition:
    background 0.35s ease,
    box-shadow 0.35s ease,
    transform 0.25s ease;

  &:hover {
    background: linear-gradient(135deg, #e45e8d 0%, #f783ac 100%);
    box-shadow:
      0 8px 24px #e45e8dbb;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 12px #e45e8d99;
  }
`;

// Тип ключів полів форми
type FormFieldName = 'firstName' | 'lastName' | 'email' | 'password' | 'confirmPassword';

const fields: { label: string; name: FormFieldName; type?: string }[] = [
  { label: 'Ім’я', name: 'firstName' },
  { label: 'Прізвище', name: 'lastName' },
  { label: 'Email', name: 'email', type: 'email' },
  { label: 'Пароль', name: 'password', type: 'password' },
  { label: 'Підтвердити пароль', name: 'confirmPassword', type: 'password' },
];

const RegisterForm2: React.FC<RegisterForm2Props> = ({ onSubmit }) => {
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');
  const [form, setForm] = useState<Record<FormFieldName, string>>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <ThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>
      <Wrapper>
        <FormCard>
          <ToggleTheme
            onClick={() => setThemeMode(t => (t === 'light' ? 'dark' : 'light'))}
            aria-label="Перемкнути тему"
          >
            {themeMode === 'light' ? '🌙' : '☀️'}
          </ToggleTheme>
          <form onSubmit={handleSubmit}>
            <Title>Створити акаунт</Title>

            {fields.map(({ label, name, type = 'text' }) => (
              <Field key={name}>
                <input
                  id={name}
                  name={name}
                  type={type}
                  placeholder=" "
                  required
                  value={form[name]}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <label htmlFor={name}>{label}</label>
              </Field>
            ))}

            <SubmitBtn type="submit">Зареєструватися</SubmitBtn>
          </form>
        </FormCard>
      </Wrapper>
    </ThemeProvider>
  );
};

export default RegisterForm2;
