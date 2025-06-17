import { ChangeEvent, useEffect } from 'react'
import { Box, Container, Grid } from '@mui/material'
import { jwtDecode} from 'jwt-decode'

// Components
import { BannerImage, FormComponent, StyledH1, StyledP, Logo } from '@/components';

// Hooks
import { useFormValidation, usePost } from '@/hooks';

// Utils
import { jwtExpirationDateConverter, pxToRem } from '@/utils';

// Types
import { DecodeJWt, MessageProps, LoginData, LoginPostData } from '@/types';

function Login() {
  const navigate = usenavigate()
  const inputs = [
    { type: 'email', placeholder: 'Email', disabled: false, required: true },
    { type: 'password', placeholder: 'Password', disabled: false, required: true },
  ];

  const { data, loading, error, post } = usePost<LoginData, LoginPostData>('login');
  const { formValues, formValid, handleChange } = useFormValidation(inputs);

  const handleMessage = (): MessageProps => {
    if (!error) {
      if (data?.jwt_token) {
        return { msg: 'Login realizado com sucesso!', type: 'success' };
      }
      return { msg: '', type: 'success' };
    }
    
    switch (error) {
      case 401:
        return {
          msg: 'Email e/ou senha inválidos',
          type: 'error',
        };
      default:
        return {
          msg: 'Não foi possível realizar a operação. Entre em contato com nosso suporte',
          type: 'error',
        };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValid) return;
    
    await post({
      email: String(formValues[0]),
      password: String(formValues[1]),
    });
  };

  useEffect(() => {
    if (data?.jwt_token) {
      const decoded: DecodeJWT = jwtDecode(data?.jwt_token)
      Cookies.set('Authorization', data?.jwt_token, {
        expires: jwtExpirationDateConverter(decoded.exp),
        secure: true,
      })
      if (Cookies.get('Authorization')) {
        navigate('/home')
      } 
    }
  }, [data, navigate]);

  return (
    <Box>
      <Grid container>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{ 
            alignItems: 'center', 
            height: '100vh',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Container maxWidth="sm" sx={{ padding: pxToRem(24) }}>
            <Box sx={{ marginBottom: pxToRem(24) }}>
              <Logo height={41} width={100} />
            </Box>
            <Box sx={{ marginBottom: pxToRem(24) }}>
              <StyledH1>Bem vindo</StyledH1>
              <StyledP>Entre com seu email e senha</StyledP>
            </Box>
            
            <FormComponent
              inputs={inputs.map((input, index) => ({
                ...input,
                value: formValues[index] ?? '',
                onChange: (e: ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value),
              }))}
              buttons={[
                {
                  className: 'primary',
                  disabled: !formValid || loading,
                  onClick: handleSubmit,
                  children: loading ? 'Carregando...' : 'Login',
                  type: 'submit',
                },
              ]}
              message={handleMessage()}
              loading={loading}
            />
          </Container>
        </Grid>
        <Grid
          item
          xs={false} // Esconde em mobile
          sm={6}
          sx={{ 
            display: { xs: 'none', sm: 'block' },
            height: '100vh',
            overflow: 'hidden'
          }}
        >
          <BannerImage heigth={100} width={100} />
        </Grid>
      </Grid>
    </Box>
  );
}


export default Login;
