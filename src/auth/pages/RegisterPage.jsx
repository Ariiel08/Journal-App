import React from 'react'
import { Link as RouterLink } from "react-router-dom";
import { Button, Grid, Link, TextField, Typography } from '@mui/material'
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";

const initialForm = {
  fullName: '',
  email: '',
  password: '',
}

const formValidations = {
  fullName: [(value) => value.length >= 1, 'Full name is required'],
  email: [(value) => value.includes('@'), 'Email must have @'],
  password: [(value) => value.length >= 6, 'Password must have more than 6 characters'],
}

export const RegisterPage = () => {

  const { 
    fullName, email, password, onInputChange, formState,
    isFormValid, fullNameIsValid, emailIsValid, passwordIsValid 
  } = useForm(initialForm, formValidations);

  const onSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <AuthLayout title="Register">
      <form onSubmit={onSubmit}>
          <Grid container>
            <Grid item xs={12} sx={{mt: 2}}>
              <TextField 
                label="Full name" 
                type="text" 
                placeholder="John Doe" 
                fullWidth
                name="fullName"
                value={fullName}
                onChange={onInputChange}
              />
            </Grid>

            <Grid item xs={12} sx={{mt: 2}}>
              <TextField 
                label="Email" 
                type="email" 
                placeholder="email@domain.com" 
                fullWidth
                name="email"
                value={email}
                onChange={onInputChange}
                autoComplete="username"
              />
            </Grid>

            <Grid item xs={12} sx={{mt: 2}}>
              <TextField 
                label="Password" 
                type="password" 
                placeholder="Password" 
                fullWidth
                name="password"
                value={password}
                onChange={onInputChange}
                autoComplete="current-password"
              />
            </Grid>

            <Grid container spacing={2} sx={{mb: 2, mt: 1}}>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" fullWidth>
                  Create account
                </Button>
              </Grid>

            </Grid>

            <Grid container direction="row" justifyContent="end">
              <Typography sx={{mr: 1}}>Do you have an account?</Typography>
              <Link component={RouterLink} color="inherit" to="/auth/register">
                Sign in
              </Link>
            </Grid>

          </Grid>
        </form>
    </AuthLayout>

    
  )
}
