import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

// import { createUser } from '../utils/API';
import Auth from '../utils/auth';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

const Signup = () => {
  const [formState, setFormState] = useState({ username: '', email: '', password: '' });
  const [addUser, { error }] = useMutation(ADD_USER);

    // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  
  //update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
 // submit form (notice the async!)
const handleFormSubmit = async event => {
  event.preventDefault();

  // use try/catch instead of promises to handle errors
  try {
    const { data } = await addUser({
      variables: { ...formState }
    });
  
    Auth.login(data.addUser.token);
  } catch (e) {
    console.error(e);
  }
};

  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your signup!
        </Alert>

        <Form.Group>
          <Form.Label htmlFor='username'>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your username'
            name='username'
            onChange={handleChange}
            value={formState.username}
            required
          />
          <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Your email address'
            name='email'
            onChange={handleChange}
            value={formState.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleChange}
            value={formState.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(formState.username && formState.email && formState.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default Signup;






// import React, { useState } from 'react';
// import { Form, Button, Alert } from 'react-bootstrap';

// // import { createUser } from '../utils/API';
// import Auth from '../utils/auth';

// import { useMutation } from '@apollo/client';
// import { ADD_USER } from '../utils/mutations';

// const SignupForm = () => {
//   // set initial form state
//   const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
//   //new
//   const [addUser, { error }] = useMutation(ADD_USER);
  
//   console.log(addUser);
//   // set state for form validation
//   const [validated] = useState(false);
//   // set state for alert
//   const [showAlert, setShowAlert] = useState(false);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setUserFormData({ ...userFormData, [name]: value });
//   };

//   const handleFormSubmit = async (event) => {

//     event.preventDefault();

//     console.log('hit');
    
//     // check if form has everything (as per react-bootstrap docs)
//     // const form = event.currentTarget;
//     // console.log(userFormData);
//     // if (form.checkValidity() === false) {
//     //   event.preventDefault();
//     //   event.stopPropagation();
//     // }
    
//     // try {
//     //   // changed createUser to addUser
//     //   const response = await addUser(userFormData);
      
//     //   if (!response.ok) {
//     //     throw new Error('something went wrong!');
//     //   }

//     //   const { token, user } = await response.json();
//     //   console.log(user);
//     //   Auth.login(token);
//     // } catch (err) {
//     //   console.error(err);
//     //   setShowAlert(true);
//     // }
//     const response = await addUser({username: 'ex',email:'example@yahoo.com',password: '123123'});
//     // const {token, user } = await response.json();
//     // console.log('user', user);
//     // console.log('token', token)
//     // Auth.login(token);
//     console.log('response', response);

//     setUserFormData({
//       username: '',
//       email: '',
//       password: '',
//     });
//   };

//   return (
//     <>
//       {/* This is needed for the validation functionality above */}
//       <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
//         {/* show alert if server response is bad */}
//         <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
//           Something went wrong with your signup!
//         </Alert>

//         <Form.Group>
//           <Form.Label htmlFor='username'>Username</Form.Label>
//           <Form.Control
//             type='text'
//             placeholder='Your username'
//             name='username'
//             onChange={handleInputChange}
//             value={userFormData.username}
//             required
//           />
//           <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
//         </Form.Group>

//         <Form.Group>
//           <Form.Label htmlFor='email'>Email</Form.Label>
//           <Form.Control
//             type='email'
//             placeholder='Your email address'
//             name='email'
//             onChange={handleInputChange}
//             value={userFormData.email}
//             required
//           />
//           <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
//         </Form.Group>

//         <Form.Group>
//           <Form.Label htmlFor='password'>Password</Form.Label>
//           <Form.Control
//             type='password'
//             placeholder='Your password'
//             name='password'
//             onChange={handleInputChange}
//             value={userFormData.password}
//             required
//           />
//           <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
//         </Form.Group>
//         <Button
//           disabled={!(userFormData.username && userFormData.email && userFormData.password)}
//           type='submit'
//           variant='success'>
//           Submit
//         </Button>
//       </Form>
//     </>
//   );
// };

// export default SignupForm;
