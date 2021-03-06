import styled from 'styled-components';

export const Container = styled.div`

`


export const Header = styled.div`
  padding: 32px 0;
  background-color: #28262e;
`


export const HeaderContent = styled.header`

  max-width: 1120px;
  margin: 0 auto;
  display:flex;
  align-items:center;

  > img {
    height: 80px;
  }

  button {
    margin-left: auto;
    background: transparent;
    border: 0;

    svg {
      color: #FFF;
      width: 20px;
      height: 20
    }
  }

`

export const Profile = styled.div`
  display:flex;
  align-items:center;
  margin-left:80px;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }


  div {

    display: flex;
    align-items:center;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: #f4ede8;
    }

    strong{
      color: #ff9000
    }
  }
`

