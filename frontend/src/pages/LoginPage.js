import { Helmet } from 'react-helmet-async';
// @mui
import { Button, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {


  const handleLogin = () => {
    axios.get('http://localhost:3000/auth/').then((response) => {
      window.location.replace(response.data.authUrl)
    }).catch((error) => {
      console.log(error);
    })
  }

  return (
    <>
      <Helmet>
        <title> Login | Minimal UI </title>
      </Helmet>

      <StyledRoot>
        <Container maxWidth="sm">
          <StyledContent>
            <Button fullWidth size="large" type="submit" variant="contained" onClick={handleLogin()}>
              Login
            </Button>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
