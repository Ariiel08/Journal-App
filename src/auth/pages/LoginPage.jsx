import React, { useMemo } from 'react'
import { Link as RouterLink } from "react-router-dom";
import { Google } from '@mui/icons-material'
import { Button, Grid, Link, TextField, Typography } from '@mui/material'
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { checkingCredentials, startGoogleSignIn } from "../../store/auth";
import { checkingAuthentication } from "../../store/auth";

export const LoginPage = () => {

  const  {status} = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const {email, password, onInputChange} = useForm({
    email: 'ariel@hotmail.com',
    password: '123456'
  });

  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const onSubmit = (e) => {
    e.preventDefault();

    console.log({email, password});
    dispatch(checkingAuthentication());
  }

  const onGoogleSignIn = (e) => {
    dispatch(startGoogleSignIn());
  }

  return (
    <AuthLayout title="Login">
      <form onSubmit={onSubmit}>
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
                autoComplete="current-password" 
              />
            </Grid>

            <Grid container spacing={2} sx={{mb: 2, mt: 1}}>
              <Grid item xs={12} sm={6}>
                <Button type="submit" variant="contained" fullWidth disabled={isAuthenticating}>
                  Login
                </Button>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Button onClick={onGoogleSignIn} variant="contained" fullWidth disabled={isAuthenticating}>
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
