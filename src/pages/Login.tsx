import { Box, Container, Grid } from '@mui/material'
import { FormComponent, StyledH1, Styledp, Logo } from '@/components'
import { pxToRem } from '@/utils'
import { useNavigate } from 'react-router-dom'

function Login() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement login logic here
    window.location.href = '/home'
  }

  return (
    <Container
      <Grid container>
        <Box
          sx={{
            alignItems: 'center',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Container maxWidth="sm">
            <Box sx={{ marginBottom: pxToRem(24) }}>
              <Logo height={41} width={100} />
            </Box>
            <Box sx={{ marginBottom: pxToRem(24) }}>
              <StyledH1>Bem vindo</StyledH1>
              <Styledp>Entre com seu email e senha</Styledp>
            </Box>
            <FormComponent              inputs={[
                { type: 'email', placeholder: 'Email' },
                { type: 'password', placeholder: 'Senha' },
              ]}              buttons={[
                { className: 'login-btn', type: 'submit', children: 'Login', onClick: (e) => {
                  e.preventDefault();
                  window.location.href = '/home';
                }},
              ]}
              message={{ type: 'success', message: 'Login successful!' }}
            />
            <Container maxWidth="sm">
              <h1>CADASTRO</h1>
            </Container>
          </Container>
        </Box>
      </Grid>
    </Container>
  )
}

export default Login
