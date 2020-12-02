import React, { useCallback, useRef, useState } from 'react';
import { Container, Content, Background, AnimationContainer } from './styles'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core'
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input'
import Button from '../../components/Button'

import { useToast } from '../../hooks/toast'

import logo from '../../assets/logo.svg'
import api from '../../services/api';

interface ForgotPasswordFormData {
  email: string;
}


const ForgotPassword: React.FC = () => {

  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();


  const handleFormSubmit = useCallback(async (data: ForgotPasswordFormData) => {
    try {

      setLoading(true);

      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail obrigatório').email('Digite um email válido'),
      })

      await schema.validate(data, {
        abortEarly: false
      });

      await api.post('/password/forgot', {
        email: data.email
      })


      addToast({
        type: 'success',
        title: 'E-mail de recuperação enviado',
        description: 'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada'
      })

    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err)

        formRef.current?.setErrors(errors)
        return
      }


      addToast({
        type: 'error',
        title: 'Erro na recuperação de senha',
        description: 'Ocorreu um erro ao tentar realizar a recuperação de senha. Tente novamente mais tarde '
      });


    } finally {
      setLoading(false);
    }
  }, [addToast, history])

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logo} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleFormSubmit}>
            <h1>Recuperar Senha</h1>

            <Input icon={FiMail} name="email" placeholder="E-mail" />

            <Button loading={loading} type="submit">Recuperar</Button>

          </Form>
          <Link to="/"><FiLogIn />Voltar ao login</Link>

        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  );
}

export default ForgotPassword;
