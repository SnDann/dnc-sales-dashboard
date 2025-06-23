import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RegistrationStep1Data {
  name: string;
  email: string;
  password: string;
}

interface RegistrationStep2Data {
  phone: string;
  company: string;
}

interface RegistrationState {
  step: 1 | 2;
  step1Data: RegistrationStep1Data | null;
  step2Data: RegistrationStep2Data | null;
}

const initialState: RegistrationState = {
  step: 1,
  step1Data: null,
  step2Data: null,
};

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    setStep1Data(state, action: PayloadAction<RegistrationStep1Data>) {
      state.step1Data = action.payload;
      state.step = 2;
    },
    setStep2Data(state, action: PayloadAction<RegistrationStep2Data>) {
      state.step2Data = action.payload;
    },
    setStep(state, action: PayloadAction<1 | 2>) {
      state.step = action.payload;
    },
    resetRegistration(state) {
      state.step = 1;
      state.step1Data = null;
      state.step2Data = null;
    },
  },
});

export const { setStep1Data, setStep2Data, setStep, resetRegistration } = registrationSlice.actions;
export default registrationSlice.reducer;
