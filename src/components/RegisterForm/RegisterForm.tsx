import React from 'react';
import './RegisterForm.css'; // Має містити dark mode стилі

// Тип для полів форми
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Тип для помилок
interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export const RegisterForm: React.FC = () => {
  const [formData, setFormData] = React.useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = React.useState<FormErrors>({});
  const [submitted, setSubmitted] = React.useState(false);
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors: FormErrors = {};

    if (!formData.firstName.trim()) validationErrors.firstName = 'Ім’я обов’язкове';
    if (!formData.lastName.trim()) validationErrors.lastName = 'Прізвище обов’язкове';
    if (!formData.email.trim()) validationErrors.email = 'Email обов’язковий';
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      validationErrors.email = 'Невірний email';

    if (!formData.password) validationErrors.password = 'Пароль обов’язковий';
    else if (formData.password.length < 6)
      validationErrors.password = 'Пароль має бути не менше 6 символів';

    if (!formData.confirmPassword)
      validationErrors.confirmPassword = 'Підтвердіть пароль';
    else if (formData.confirmPassword !== formData.password)
      validationErrors.confirmPassword = 'Паролі не збігаються';

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
      console.log('Форма відправлена:', formData);
      // Тут можна відправити на сервер
    }
  };

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);

    if (newMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  };

  return (
    <div className="form-container">
      <button type="button" className="theme-toggle-btn" onClick={toggleTheme}>
        {isDarkMode ? 'Світла тема' : 'Темна тема'}
      </button>

      <h2>Реєстрація</h2>
      {submitted && <p style={{ color: 'green' }}>Успішно зареєстровано!</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Ім’я</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={errors.firstName ? 'input-error' : ''}
          />
          {errors.firstName && <span className="error-text">{errors.firstName}</span>}
        </div>

        <div className="form-group">
          <label>Прізвище</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={errors.lastName ? 'input-error' : ''}
          />
          {errors.lastName && <span className="error-text">{errors.lastName}</span>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Пароль</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? 'input-error' : ''}
          />
          {errors.password && <span className="error-text">{errors.password}</span>}
        </div>

        <div className="form-group">
          <label>Підтвердити пароль</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={errors.confirmPassword ? 'input-error' : ''}
          />
          {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
        </div>

        <button type="submit" className="submit-btn">
          Зареєструватись
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;