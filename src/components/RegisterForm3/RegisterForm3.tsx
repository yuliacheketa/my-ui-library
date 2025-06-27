import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeInLayer = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const showLogin = keyframes`
  0% {
    background: #d7e7f1;
    transform: translate(40%, 10px);
  }
  50% {
    transform: translate(0, 0);
  }
  100% {
    background-color: #fff;
    transform: translate(35%, -20px);
  }
`;

const hideLogin = keyframes`
  0% {
    background-color: #fff;
    transform: translate(35%, -20px);
  }
  50% {
    transform: translate(0, 0);
  }
  100% {
    background: #d7e7f1;
    transform: translate(40%, 10px);
  }
`;

const showSignup = keyframes`
  0% {
    background: #d7e7f1;
    transform: translate(-40%, 10px) scaleY(0.8);
  }
  50% {
    transform: translate(0, 0) scaleY(0.8);
  }
  100% {
    background-color: #fff;
    transform: translate(-35%, -20px) scaleY(1);
  }
`;

const hideSignup = keyframes`
  0% {
    background-color: #fff;
    transform: translate(-35%, -20px) scaleY(1);
  }
  50% {
    transform: translate(0, 0) scaleY(0.8);
  }
  100% {
    background: #d7e7f1;
    transform: translate(-40%, 10px) scaleY(0.8);
  }
`;

const FormsSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #3b4465;
  min-height: 100vh;
  padding: 2rem;
`;

const SectionTitle = styled.h1`
  font-size: 32px;
  letter-spacing: 1px;
  color: #fff;
`;

const Forms = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 30px;
`;

const FormWrapper = styled.div<{ active: boolean }>`
  position: relative;
  margin: 0 1rem;
  z-index: ${props => (props.active ? 10 : 1)};
  animation: ${props => (props.active ? fadeInLayer : 'none')} 0.3s ease forwards;
`;


const Switcher = styled.button<{ active: boolean; typeStyle: 'login' | 'signup' }>`
  position: relative;
  cursor: pointer;
  display: block;
  margin: 0 auto 10px auto;
  padding: 0;
  text-transform: uppercase;
  font-family: inherit;
  font-size: 16px;
  letter-spacing: 0.5px;
  color: ${props => (props.active ? '#fff' : '#999')};
  background-color: transparent;
  border: none;
  outline: none;
  transition: all 0.3s ease-out;
  transform: translateX(0);

  &:hover {
    color: #fff;
  }

  /* рух кнопок при активній формі */
  ${props =>
    props.active && props.typeStyle === 'login'
      ? `transform: translateX(90px);`
      : ''};

  ${props =>
    props.active && props.typeStyle === 'signup'
      ? `transform: translateX(-90px);`
      : ''};
`;

const Underline = styled.span`
  position: absolute;
  bottom: -5px;
  left: 0;
  overflow: hidden;
  pointer-events: none;
  width: 100%;
  height: 2px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: inherit;
    display: block;
    width: inherit;
    height: inherit;
    background-color: currentColor;
    transition: transform 0.2s ease-out;
  }
`;

/* Для псевдоелементів з анімацією трансформації
   доведеться використати CSS клас і через React refs
   можна зробити, але для простоти зараз опустимо */

const Form = styled.form<{ typeStyle: 'login' | 'signup'; active: boolean }>`
  overflow: hidden;
  min-width: 260px;
  margin-top: 50px;
  padding: 30px 25px;
  border-radius: 5px;
  transform-origin: top;
  background-color: #fff;

  animation: ${props =>
      props.active
        ? props.typeStyle === 'login'
          ? showLogin
          : showSignup
        : props.typeStyle === 'login'
        ? hideLogin
        : hideSignup}
    0.3s ease forwards;

  fieldset {
    position: relative;
    opacity: ${props => (props.active ? 1 : 0)};
    margin: 0;
    padding: 0;
    border: 0;
    transition: all 0.3s ease-out;
    transform: translateX(${props => (props.active ? '0' : props.typeStyle === 'login' ? '-50%' : '50%')});
  }

  legend {
    position: absolute;
    overflow: hidden;
    width: 1px;
    height: 1px;
    clip: rect(0 0 0 0);
  }

  .input-block {
    margin-bottom: 20px;
  }

  .input-block label {
    font-size: 14px;
    color: #a1b4b4;
  }

  .input-block input {
    display: block;
    width: 100%;
    margin-top: 8px;
    padding: 0 15px;
    font-size: 16px;
    line-height: 40px;
    color: #3b4465;
    background: #eef9fe;
    border: 1px solid #cddbef;
    border-radius: 2px;
  }

  button[type='submit'] {
    opacity: ${props => (props.active ? 1 : 0)};
    display: block;
    min-width: 120px;
    margin: 30px auto 10px;
    font-size: 18px;
    line-height: 40px;
    border-radius: 25px;
    border: none;
    transition: all 0.3s ease-out;
    cursor: pointer;
    transform: translateX(${props => (props.active ? '0' : props.typeStyle === 'login' ? '-30%' : '30%')});
  }
`;

const BtnLogin = styled.button`
  color: #fbfdff;
  background: #a7e245;
`;

const BtnSignup = styled.button`
  color: #a7e245;
  background: #fbfdff;
  box-shadow: inset 0 0 0 2px #a7e245;
`;

const RegisterForm3: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

  return (
    <FormsSection>
      <SectionTitle>Форма реєстрації + логіну</SectionTitle>
      <Forms>
        <FormWrapper active={activeTab === 'login'} className={activeTab === 'login' ? 'is-active' : ''}>
          <Switcher
            type="button"
            active={activeTab === 'login'}
            typeStyle="login"
            onClick={() => setActiveTab('login')}
          >
            Ввійти
            <Underline />
          </Switcher>
          <Form
            className="form-login"
            typeStyle="login"
            active={activeTab === 'login'}
            onSubmit={e => {
              e.preventDefault();
              alert('Login submit');
            }}
          >
            <fieldset>
              <legend>Введіть пароль та логін для входу</legend>
              <div className="input-block">
                <label htmlFor="login-email">E-mail</label>
                <input id="login-email" type="email" required />
              </div>
              <div className="input-block">
                <label htmlFor="login-password">Пароль</label>
                <input id="login-password" type="password" required />
              </div>
            </fieldset>
            <BtnLogin type="submit" className="btn-login">
              Ввійти
            </BtnLogin>
          </Form>
        </FormWrapper>

        <FormWrapper active={activeTab === 'signup'} className={activeTab === 'signup' ? 'is-active' : ''}>
          <Switcher
            type="button"
            active={activeTab === 'signup'}
            typeStyle="signup"
            onClick={() => setActiveTab('signup')}
          >
            Зареєструватись
            <Underline />
          </Switcher>
          <Form
            className="form-signup"
            typeStyle="signup"
            active={activeTab === 'signup'}
            onSubmit={e => {
              e.preventDefault();
              alert('Sign Up submit');
            }}
          >
            <fieldset>
              <legend>Будь ласка, введіть логін та пароль щоб зареєструватись</legend>
              <div className="input-block">
                <label htmlFor="signup-email">E-mail</label>
                <input id="signup-email" type="email" required />
              </div>
              <div className="input-block">
                <label htmlFor="signup-password">Пароль</label>
                <input id="signup-password" type="password" required />
              </div>
              <div className="input-block">
                <label htmlFor="signup-password-confirm">Підтвердіть пароль</label>
                <input id="signup-password-confirm" type="password" required />
              </div>
            </fieldset>
            <BtnSignup type="submit" className="btn-signup">
              Продовжити
            </BtnSignup>
          </Form>
        </FormWrapper>
      </Forms>
    </FormsSection>
  );
};

export default RegisterForm3;
