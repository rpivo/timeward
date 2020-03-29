import React from 'react';
import { StyledForm } from '@styles/components/Form.styled';

type FormProps = {
  children: React.ReactNode;
  onSubmit: () => void;
};

type FormComposition = { Input: React.FC<InputProps> };

type InputProps = {
  password?: boolean;
  placeholder: string;
};

const Input: React.FC<InputProps> = ({ password, placeholder }: InputProps): JSX.Element =>
  <input
    autoComplete={ password ? 'on' : undefined }
    placeholder={ placeholder }
    type={ password ? 'password' : 'text' }
  />;

const Form: React.FC<FormProps> & FormComposition =
  ({ children, onSubmit }: FormProps): JSX.Element =>
    <StyledForm>
      <label>LOGIN</label>
      { children }
      <input onClick={ onSubmit } type="submit" value="SUBMIT" />
    </StyledForm>;

Form.Input = Input;

export default Form;
