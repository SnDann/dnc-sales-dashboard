import {Box, Container, Grid} from '@mui/material';
import {BannerImage, FormComponent, StyledH1, StyledP, Logo } from '@/pages';
import { pxToRem } from '@/utils';

function Login() {
  return (
    <>
    <Box>
      <Grid container>
      <Grid 
       item xs={12}
        sm={6}
         sx={{alignItems: 'center', height: '100vh'}}
         >
      <Container maxWidth="sm">
        <Box sx={{ marginBottom: pxToRem(24) }}><Logo heigth={41} width={100} /></Box>
        <Box sx={{ marginBottom: pxToRem(24) }}>
          <StyledH1>Bem vindo</StyledH1>
          <StyledP>Entre com seu email e senha</StyledP>
        </Box>
        <FormComponent inputs={[
          {type: 'email', placeholder: 'Email', disabled: true},
          {type: 'password', placeholder: 'Password'}
        ]} 
        />
        </Container>
      </Grid>
      <Grid>
       item
        sm={6}
         sx={{display: {xs: 'none', sm: 'block'},
        }}
        button = {[
          { className: 'primary', type: 'submit', children: 'Login' },
        ]}
        message = {{ type: 'success', message: 'Sucesso!!!' }}
         />
         <Container maxWidth="sm">
        <h1>CADASTRO</h1>
      </Grid>
      <Grid>
       item
        sm={6}
         sx={{ display: { xs: 'none', sm: 'block' } }}>
        <BannerImage />
      </Grid>
      </Grid>
     </Box>
    </>
  )
}

export default Login;