import React, { useCallback, useRef } from 'react';
import { Container, Content, Background, AnimationContainer } from './styles'
import { FiLock } from 'react-icons/fi';
import { useHistory, useLocation } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core'
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { useToast } from '../../hooks/toast'

import logo from '../../assets/logo.svg'

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}


const ResetPassword: React.FC = () => {

  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();
  const location = useLocation();




  const handleFormSubmit = useCallback(async (data: ResetPasswordFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        password: Yup.string().required('Senha obrigatória'),
        password_confirmation: Yup.string().nullable()
          .oneOf([Yup.ref('password'), null], 'Senhas não coincidem')
      })

      await schema.validate(data, {
        abortEarly: false
      });

      const { password, password_confirmation } = data;
      const token = location.search.replace('?token=', '')

      if (!token) {
        throw new Error();
      }

      await api.post('/password/reset', {
        password,
        password_confirmation,
        token
      })

      history.push('/')

    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err)

        formRef.current?.setErrors(errors)
        return
      }


      addToast({
        type: 'error',
        title: 'Erro ao restar senha',
        description: 'Ocorreu um erro ao restar sua senha, tente novamente'
      });


    }
  }, [addToast, history, location.search])

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logo} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleFormSubmit}>
            <h1>Resetar senha</h1>

            <Input icon={FiLock} name="password" type="password" placeholder="Senha" />
            <Input icon={FiLock} name="password_confirmation" type="password" placeholder="Confirmação de senha" />

            <Button type="submit">Alterar Senha</Button>

          </Form>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  );
}

export default ResetPassword;
