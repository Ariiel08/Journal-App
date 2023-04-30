import React, { useMemo } from 'react'
import { Link as RouterLink } from "react-router-dom";
import { Google } from '@mui/icons-material'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { startEmailSignIn, startGoogleSignIn } from "../../store/auth";

const initialForm = {
  email: 'ariel@hotmail.com',
  password: '123456'
}

export const LoginPage = () => {

  const  { status, errorMessage } = useSelector(state => state.auth);
  const isCheckingAuth = useMemo(() => status === 'checking', [status]);

  const dispatch = useDispatch();

  const { email, password, onInputChange } = useForm(initialForm);

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(startEmailSignIn({email, password}));
  }

  const onGoogleSignIn = (e) => {
    dispatch(startGoogleSignIn());
  }

  return (
    <AuthLayout title="Login">
      <form aria-label="login-form" onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
          <Grid container>
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
                inputProps={{
                  'data-testid': 'password'
                }}
                autoComplete="current-password" 
              />
            </Grid>

            <Grid container spacing={2} sx={{mb: 2, mt: 1}}>

              <Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
                <Alert severity="error">{errorMessage}</Alert>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Button type="submit" variant="contained" fullWidth disabled={isCheckingAuth}>
                  Login
                </Button>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Button 
                  onClick={onGoogleSignIn} 
                  variant="contained" 
                  fullWidth 
                  aria-label="google-button"
                  disabled={isCheckingAuth}>
                  <Google />
                  <Typography sx={{ml: 1}}>Google</Typography>
                </Button>
              </Grid>
            </Grid>

            <Grid container direction="row" justifyContent="end">
              <Link component={RouterLink} color="inherit" to="/auth/register">
                Create account
              </Link>

            </Grid>

          </Grid>
        </form>
    </AuthLayout>

    
  )
}
