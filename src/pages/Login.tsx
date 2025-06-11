import { Box, Container, Grid } from '@mui/material';
import { FormComponent, StyledH1, StyledP, Logo } from '@/components';
import { pxToRem } from '@/utils';
import { useNavigate } from 'react-router-dom';

function Login() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement login logic here
    window.location.href = '/home'
  }

  return (
    <Container maxWidth="xl">
      <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              minHeight: '100vh',
            }}
          >
            <Box sx={{ marginBottom: pxToRem(24) }}>
              <Logo height={41} width={100} />
            </Box>
            <Box sx={{ marginBottom: pxToRem(24) }}>
              <StyledH1>Bem vindo</StyledH1>
              <StyledP>Entre com seu email e senha</StyledP>
            </Box>
            <FormComponent
              inputs={[
                { type: 'email', placeholder: 'Email' },
                { type: 'password', placeholder: 'Senha' },
              ]}
              buttons={[
                {
                  className: 'login-btn',
                  type: 'submit',
                  children: 'Login',
                  onClick: (e) => {
                    e.preventDefault();
                    window.location.href = '/home';
                  },
                },
              ]}
              message={{ type: 'success', message: 'Login successful!' }}
            />
            <Box sx={{ marginTop: pxToRem(24) }}>
              <h1>CADASTRO</h1>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Login
