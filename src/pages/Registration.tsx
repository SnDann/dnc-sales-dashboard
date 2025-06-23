import React, { useEffect } from 'react';
import { Box, Container, Grid, TextField, Button, Typography, CircularProgress } from '@mui/material';
import { useFormValidation } from '@/hooks';
import { useAxiosPost } from '@/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  setStep1Data,
  setStep2Data,
  setStep,
  resetRegistration,
} from '@/store/registrationSlice';
import { setCredentials, authLoading, authFailed } from '@/store/authSlice';
import type { RootState } from '@/store';

interface Step1Data {
  name: string;
  email: string;
  password: string;
}
interface Step2Data {
  phone: string;
  company: string;
}

function Registration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { step, step1Data } = useSelector((state: RootState) => state.registration);

  // Registration API hook
  const registerHook = useAxiosPost<{ token: string }>(
    '/api/register',
    {},
    {},
    { immediate: false }
  );

  // Step 1 form
  const {
    values: values1,
    errors: errors1,
    touched: touched1,
    handleChange: handleChange1,
    handleBlur: handleBlur1,
    handleSubmit: submitStep1,
    isSubmitting: submitting1,
  } = useFormValidation<Step1Data>({
    initialValues: { name: '', email: '', password: '' },
    validationRules: {
      name: { required: 'Nome obrigatório' },
      email: { required: true, email: 'Email inválido' },
      password: { required: true, minLength: { value: 8, message: 'Mínimo 8 caracteres' } },
    },
    onSubmit: (vals) => {
      dispatch(setStep1Data(vals));
      dispatch(setStep(2));
    },
    validateOnBlur: true,
    validateOnChange: false,
  });

  // Step 2 form
  const {
    values: values2,
    errors: errors2,
    touched: touched2,
    handleChange: handleChange2,
    handleBlur: handleBlur2,
    handleSubmit: submitStep2,
    isSubmitting: submitting2,
  } = useFormValidation<Step2Data>({
    initialValues: { phone: '', company: '' },
    validationRules: {
      phone: { required: 'Telefone obrigatório', pattern: { value: /^\\d{10,11}$/, message: 'Formato inválido' } },
      company: { required: 'Empresa obrigatório' },
    },
    onSubmit: async (vals) => {
      dispatch(setStep2Data(vals));
      // Combine data and call API
      dispatch(authLoading());
      const payload = { ...step1Data, ...vals } as Step1Data & Step2Data;
      const result = await registerHook.execute({ data: payload });
      if (result && result.token) {
        dispatch(setCredentials({ token: result.token }));
        navigate('/home');
        dispatch(resetRegistration());
      } else {
        dispatch(authFailed('Falha no cadastro'));
      }
    },
    validateOnBlur: true,
    validateOnChange: false,
  });

  // Render loading
  if (submitting1 || submitting2 || registerHook.loading) {
    return (
      <Container style={{ textAlign: 'center', marginTop: 50 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Box>
      <Grid container>
        <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', height: '100vh' }}>
          <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
              Cadastro - Passo {step}
            </Typography>
            {step === 1 && (
              <form noValidate onSubmit={submitStep1}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Nome"
                  name="name"
                  value={values1.name}
                  onChange={handleChange1('name')}
                  onBlur={handleBlur1('name')}
                  error={Boolean(touched1.name && errors1.name)}
                  helperText={touched1.name && errors1.name}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Email"
                  name="email"
                  type="email"
                  value={values1.email}
                  onChange={handleChange1('email')}
                  onBlur={handleBlur1('email')}
                  error={Boolean(touched1.email && errors1.email)}
                  helperText={touched1.email && errors1.email}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Senha"
                  name="password"
                  type="password"
                  value={values1.password}
                  onChange={handleChange1('password')}
                  onBlur={handleBlur1('password')}
                  error={Boolean(touched1.password && errors1.password)}
                  helperText={touched1.password && errors1.password}
                />
                <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
                  Próximo
                </Button>
              </form>
            )}
            {step === 2 && (
              <form noValidate onSubmit={submitStep2}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Telefone"
                  name="phone"
                  value={values2.phone}
                  onChange={handleChange2('phone')}
                  onBlur={handleBlur2('phone')}
                  error={Boolean(touched2.phone && errors2.phone)}
                  helperText={touched2.phone && errors2.phone}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Empresa"
                  name="company"
                  value={values2.company}
                  onChange={handleChange2('company')}
                  onBlur={handleBlur2('company')}
                  error={Boolean(touched2.company && errors2.company)}
                  helperText={touched2.company && errors2.company}
                />
                <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
                  Finalizar Cadastro
                </Button>
              </form>
            )}
          </Container>
        </Grid>
        <Grid item md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
          {/* You can add an image or banner here */}
        </Grid>
      </Grid>
    </Box>
  );
}

export default Registration;