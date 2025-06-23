import React, { useEffect } from 'react';
import { Container, TextField, Button, CircularProgress, Typography } from '@mui/material';
import { useFormValidation } from '@/hooks';
import { useAxiosGet, useAxiosPut } from '@/hooks';
import { UserProfile } from '@/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setUserProfile, userLoading, userFailed } from '@/store/userSlice';

function Profile() {
  const dispatch = useDispatch();
  const userState = useSelector((state: RootState) => state.user);

  // Fetch profile data
  const profileHook = useAxiosGet<UserProfile>('/api/user/profile');

  // Initialize form
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
  } = useFormValidation<UserProfile>({
    initialValues: { name: '', email: '', phone: '' },
    validationRules: {
      name: { required: 'Nome é obrigatório' },
      email: { required: true, email: 'Email inválido' },
      phone: { required: 'Telefone é obrigatório', pattern: { value: /^\\d{10,11}$/, message: 'Telefone inválido' } },
    },
    onSubmit: async (formValues) => {
      try {
        dispatch(userLoading());
        const updated = await useAxiosPut<UserProfile>('/api/user/profile', formValues).execute();
        if (updated) {
          dispatch(setUserProfile(updated));
        }
      } catch (err) {
        dispatch(userFailed('Erro ao atualizar perfil'));
      }
    },
    validateOnBlur: true,
  });

  // Populate form when data arrives
  useEffect(() => {
    if (profileHook.data) {
      dispatch(setUserProfile(profileHook.data));
      reset();
    }
  }, [profileHook.data, dispatch, reset]);

  if (profileHook.loading || userState.status === 'loading') {
    return (
      <Container style={{ textAlign: 'center', marginTop: 50 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (profileHook.error) {
    return (
      <Container style={{ textAlign: 'center', marginTop: 50 }}>
        <Typography color="error">{profileHook.error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" style={{ marginTop: 40 }}>
      <Typography variant="h5" gutterBottom>
        Meu Perfil
      </Typography>
      <form noValidate onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Nome"
          name="name"
          value={values.name}
          onChange={handleChange('name')}
          onBlur={handleBlur('name')}
          error={Boolean(touched.name && errors.name)}
          helperText={touched.name && errors.name}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange('email')}
          onBlur={handleBlur('email')}
          error={Boolean(touched.email && errors.email)}
          helperText={touched.email && errors.email}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Telefone"
          name="phone"
          value={values.phone}
          onChange={handleChange('phone')}
          onBlur={handleBlur('phone')}
          error={Boolean(touched.phone && errors.phone)}
          helperText={touched.phone && errors.phone}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          style={{ marginTop: 16 }}
        >
          {isSubmitting ? 'Atualizando...' : 'Atualizar Perfil'}
        </Button>
      </form>
    </Container>
  );
}

export default Profile;