import React from 'react';

import { Container, HeaderContent, Profile, Header } from './styles'

import logoImg from '../../assets/logo.svg';
import { FiPower } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {


  const { signOut, user } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="goBarber" />

          <Profile>

            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem Vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>

        </HeaderContent>
      </Header>
    </Container>
  )
};

export default Dashboard;
