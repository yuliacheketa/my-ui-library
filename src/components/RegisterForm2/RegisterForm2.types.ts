export interface RegisterForm2Props {
  onSubmit: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => void;
}

