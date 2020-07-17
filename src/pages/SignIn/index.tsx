import React, { useCallback, useRef, } from 'react';
import { Container, Content, Background } from './styles'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core'
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input'
import Button from '../../components/Button'



import logo from '../../assets/logo.svg'

const SignIn: React.FC = () => {

  const formRef = useRef<FormHandles>(null);

  const handleFormSubmit = useCallback(async (data) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail obrigatório').email('Digite um email válido'),
        password: Yup.string().required('Senha obrigatória')
      })

      await schema.validate(data, {
        abortEarly: false
      });



    } catch (err) {

      const errors = getValidationErrors(err)

      formRef.current?.setErrors(errors)


    }
  }, [])

  return (
    <Container>
      <Content>
        <img src={logo} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleFormSubmit}>
          <h1>Faça seu logon</h1>

          <Input icon={FiMail} name="email" placeholder="E-mail" />
          <Input icon={FiLock} name="password" type="password" placeholder="Senha" />


          <Button type="submit">Entrar</Button>

          <a href="forgot">Esqueci minha senha </a>

        </Form>
        <a href="forgot"><FiLogIn /> Criar conta</a>

      </Content>
      <Background />
    </Container>
  );
}

export default SignIn;
