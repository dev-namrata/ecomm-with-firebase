import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Card from '@mui/material/Card';

import { Link as Other, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase_setup/firebase';
import { InputControl } from '../../Components';

const defaultTheme = createTheme();

function Signup() {
  const navigate = useNavigate();
  const [registerValues, setRegisterValues] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    firebaseerr: '',
  });
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  type RegisterField = keyof typeof registerValues;

  //   const validateForm = (field: RegisterField) => {
  //     let isValid = true;
  //     const newErrors = { name: '', email: '', password: '' };

  //     switch (field) {
  //       case 'name':
  //         if (!/^[a-zA-Z]*$/.test(registerValues[field])) {
  //           newErrors[field] = 'Name cannot contain numbers';
  //           isValid = false;
  //         }
  //         break;

  //       case 'email':
  //         if (
  //           !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
  //             registerValues[field]
  //           )
  //         ) {
  //           newErrors[field] = 'Invalid email address';
  //           isValid = false;
  //         }
  //         break;
  //       case 'password':
  //         if (registerValues[field].length < 6) {
  //           newErrors[field] = 'Password must be at least 6 characters long';
  //           isValid = false;
  //         }
  //         break;
  //       default:
  //         break;
  //     }

  //     setErrors(newErrors);
  //     return isValid;
  //   };

  //   const validateForm = () => {
  //     let isValid = true;
  //     const newErrors = { name: '', email: '', password: '' };

  //     if (!/^[a-zA-Z]*$/.test(registerValues.name)) {
  //       newErrors.name = 'Name cannot contain numbers';
  //       isValid = false;
  //       console.log('newErrors', newErrors);
  //       setErrors(newErrors);
  //     }

  //     if (
  //       !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
  //         registerValues.email
  //       )
  //     ) {
  //       newErrors.email = 'Invalid email address';
  //       isValid = false;
  //       setErrors(newErrors);
  //     }

  //     if (registerValues.password.length < 6) {
  //       newErrors.password = 'Password must be at least 6 characters long';
  //       isValid = false;
  //       setErrors(newErrors);
  //     }

  //     return isValid;
  //   };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !registerValues.name ||
      !registerValues.email ||
      !registerValues.password
    ) {
      Swal.fire({
        title: 'Oops!',
        text: 'Please fill out all required fields correctly',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      console.log('if---');
      return;
    } else if (Object.values(errors).some((error) => error)) {
      // Check if any error message is non-empty
      Swal.fire({
        title: 'Oops!',
        text: 'There are some issues in your fields',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    } else {
      setRegisterValues({
        name: '',
        email: '',
        password: '',
      });
      setSubmitButtonDisabled(true);
      createUserWithEmailAndPassword(
        auth,
        registerValues.email,
        registerValues.password
      )
        .then(async (res) => {
          console.log('then');
          setSubmitButtonDisabled(false);
          const user = res.user;
          await updateProfile(user, { displayName: registerValues.name });
          console.log(user, 'USER');
          console.log('else');
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your are registered successfully',
            showConfirmButton: false,
            timer: 1500,
          });
          navigate('/');
        })
        .catch((err) => {
          console.log(err, 'err');

          setSubmitButtonDisabled(false);
          setErrors({ ...errors, firebaseerr: err.message });
          Swal.fire({
            title: 'Oops!',
            text: 'There are some issues in your fields',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterValues({
      ...registerValues,
      [name]: value,
    });
    validateField(name as keyof typeof registerValues, value);
  };

  const validateField = (field: keyof typeof registerValues, value: string) => {
    const newErrors = { ...errors };

    switch (field) {
      case 'name':
        newErrors.name = !/^[a-zA-Z]*$/.test(value)
          ? 'Name cannot contain numbers'
          : '';
        break;
      case 'email':
        newErrors.email =
          !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value
          )
            ? 'Invalid email address'
            : '';
        break;
      case 'password':
        newErrors.password =
          value.length < 6 ? 'Password must be at least 6 characters long' : '';
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  console.log(errors, 'ERRRR');

  return (
    <Card
      sx={{
        position: 'relative',
        top: '56px',
        width: '27%',
        boxShadow: 3,
        margin: 'auto',
      }}
    >
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              margin: '30px',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              {/* <LockOutlinedIcon /> */}
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box
              component="form"
              noValidate
              sx={{ mt: 1 }}
              onSubmit={submitHandler}
            >
              <InputControl
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                value={registerValues.name}
                onChange={handleChange}
                autoFocus
              />
              {errors.name && (
                <span style={{ color: 'red' }}>{errors.name}</span>
              )}

              <InputControl
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={registerValues.email}
                autoComplete="email"
                onChange={handleChange}
              />
              {errors.email && (
                <span style={{ color: 'red' }}>{errors.email}</span>
              )}
              <InputControl
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={registerValues.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
              {errors.password && (
                <span style={{ color: 'red' }}>{errors.password}</span>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={submitButtonDisabled}
              >
                Register
              </Button>
              {errors.firebaseerr && (
                <span style={{ color: 'red' }}>{errors.firebaseerr}</span>
              )}
              <Grid container>
                <Grid item>
                  <Other to="/login">Already have an account? Sign in</Other>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </Card>
  );
}

export default Signup;

// import React from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import Card from '@mui/material/Card';
// import { Link as Other } from 'react-router-dom';
// import { useForm, SubmitHandler } from 'react-hook-form';
// import { InputControl } from '../InputController/inputController';

// const defaultTheme = createTheme();

// interface IdefaultValues {
//   name: string;
//   email: string;
//   password: string;
// }

// interface RegisterFormValues {
//   defaultValues: IdefaultValues;
// }

// export const Signup = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       name: '',
//       email: '',
//       password: '',
//     },
//   });

//   const onSubmit = handleSubmit((data) => console.log(data));

//   return (
//     <Card
//       sx={{
//         position: 'relative',
//         top: '56px',
//         width: '27%',
//         boxShadow: 3,
//         margin: 'auto',
//       }}
//     >
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 8,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             margin: '30px',
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
//           <Typography component="h1" variant="h5">
//             Sign Up
//           </Typography>

//           {/* <form  onSubmit={handleSubmit(onSubmit)}> */}
//           <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={onSubmit}>
//             <InputControl
//               {...register('name', { required: 'Name is required' })}
//               margin="normal"
//               fullWidth
//               id="name"
//               label="Name"
//               autoComplete="name"
//               autoFocus
//             />
//             {errors?.name && (
//               <Typography variant="caption" color="error">
//                 {errors?.name?.message}
//               </Typography>
//             )}

//             <InputControl
//               {...register('email', {
//                 required: 'Email is required',
//                 pattern: {
//                   value:
//                     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
//                   message: 'Please enter a valid email',
//                 },
//               })}
//               margin="normal"
//               fullWidth
//               id="email"
//               label="Email Address"
//               autoComplete="email"
//             />
//             {errors?.email && (
//               <Typography variant="caption" color="error">
//                 {errors?.email?.message}
//               </Typography>
//             )}

//             <InputControl
//               {...register('password', {
//                 required: 'Password is required',
//                 minLength: {
//                   value: 6,
//                   message: 'Password must have at least 6 characters',
//                 },
//               })}
//               margin="normal"
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               autoComplete="current-password"
//             />
//             {errors?.password && (
//               <Typography variant="caption" color="error">
//                 {errors?.password?.message}
//               </Typography>
//             )}

//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Register
//             </Button>
//             {/* </form> */}
//           </Box>
//           <Grid container>
//             <Grid item>
//               <Other to="/login">Already have an account? Sign in</Other>
//             </Grid>
//           </Grid>
//         </Box>
//       </Container>
//     </Card>
//   );
// };
