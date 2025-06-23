import React, { useEffect } from 'react';
import {
  Container,
  Typography,
  CircularProgress,
  Button,
  TextField,
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAxiosGet, useAxiosPost, useAxiosDelete } from '@/hooks';
import { useFormValidation } from '@/hooks';
import { Lead } from '@/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import {
  setLeads,
  leadsLoading,
  leadsFailed,
  addLead as addLeadAction,
  removeLead as removeLeadAction,
} from '@/store/leadsSlice';

function Leads() {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state: RootState) => state.leads);

  // Fetch leads on mount
  const fetchLeads = useAxiosGet<Lead[]>('/api/leads', {}, {
    onSuccess: (data) => dispatch(setLeads(data)),
    onError: (err) => dispatch(leadsFailed(err.message)),
  });

  useEffect(() => {
    dispatch(leadsLoading());
    fetchLeads.execute();
  }, []);

  // Form to add new lead
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    isSubmitting,
  } = useFormValidation<{ name: string; email: string }>({
    initialValues: { name: '', email: '' },
    validationRules: {
      name: { required: 'Name is required' },
      email: { required: true, email: 'Invalid email' },
    },
    onSubmit: async (vals) => {
      const result = await useAxiosPost<Lead>('/api/leads', vals).execute();
      if (result) {
        dispatch(addLeadAction(result));
        reset();
      }
    },
  });

  const handleDelete = async (id: string) => {
    const result = await useAxiosDelete<void>(`/api/leads/${id}`).execute();
    if (result === null) {
      dispatch(removeLeadAction(id));
    }
  };

  if (status === 'loading') {
    return (
      <Container style={{ textAlign: 'center', marginTop: 50 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (status === 'failed') {
    return (
      <Container style={{ textAlign: 'center', marginTop: 50 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" style={{ marginTop: 40 }}>
      <Typography variant="h5" gutterBottom>
        Leads
      </Typography>

      {/* Form to add a new lead */}
      <Box component="form" onSubmit={handleSubmit} mb={2}>
        <TextField
          fullWidth
          margin="normal"
          label="Name"
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
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          sx={{ mt: 2 }}
        >
          {isSubmitting ? 'Adding...' : 'Add Lead'}
        </Button>
      </Box>

      {/* List of leads */}
      <List>
        {list.map((lead) => (
          <ListItem
            key={lead.id}
            secondaryAction={
              <IconButton edge="end" onClick={() => handleDelete(lead.id)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText primary={lead.name} secondary={lead.email} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default Leads;