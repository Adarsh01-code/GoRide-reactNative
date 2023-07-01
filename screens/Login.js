import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Modal, TouchableWithoutFeedback } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';


const Login = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isSignUpDisabled, setIsSignUpDisabled] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();
  const mapRef = useRef(null);

  useEffect(() => {
    checkSignUpButtonStatus();
  }, [firstName, lastName, email, password]);

  const checkSignUpButtonStatus = () => {
    if (
      firstName.length > 0 &&
      lastName.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      isValidEmail(email) &&
      isValidPassword(password)
    ) {
      setIsSignUpDisabled(false);
    } else {
      setIsSignUpDisabled(true);
    }
  };

  const handleSignUp = () => {
    // dispatch(setFirstName(firstName));
    // Redirect to Home screen on successful signup
    navigation.navigate('HomeScreen');
  };

  const handleSignInWithGoogle = () => {
    setShowAlert(true);
  };

  const handleSignInWithApple = () => {
    setShowAlert(true);
  };

  const validateEmail = () => {
    if (email === '') {
      setEmailError('Email is required');
    } else if (!isValidEmail(email)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = () => {
    if (password === '') {
      setPasswordError('Password is required');
    } else if (!isValidPassword(password)) {
      setPasswordError('Password must be 6 characters long and contain at least one uppercase letter and one number');
    } else {
      setPasswordError('');
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    return passwordRegex.test(password);
  };

  const handleTap = () => {
    setShowAlert(false);
  };

  return (
    <TouchableWithoutFeedback onPress={handleTap}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.form}>
          <Text style={styles.heading}>Sign Up</Text>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            onBlur={validateEmail}
          />
          {emailError !== '' && <Text style={styles.error}>{emailError}</Text>}
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            onBlur={validatePassword}
          />
          {passwordError !== '' && <Text style={styles.error}>{passwordError}</Text>}
          <TouchableOpacity
            style={[styles.button, isSignUpDisabled ? styles.disabledButton : null]}
            onPress={handleSignUp}
            disabled={isSignUpDisabled}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.googleButton} onPress={handleSignInWithGoogle}>
            <Text style={styles.googleButtonText}>Sign In with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.appleButton} onPress={handleSignInWithApple}>
            <Text style={styles.appleButtonText}>Sign In with Apple ID</Text>
          </TouchableOpacity>
        </View>

        {/* Alert Modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={showAlert}
          onRequestClose={() => setShowAlert(false)}
        >
          <TouchableWithoutFeedback onPress={handleTap}>
            <View style={styles.modal}>
              <View style={styles.modalContainer}>
                <Text style={styles.alertText}> Still in Development </Text>
                <TouchableOpacity style={styles.checkIcon} onPress={handleTap}>
                  
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  form: {
    width: '80%',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'black',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  googleButton: {
    backgroundColor: '#4285F4',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  googleButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  appleButton: {
    backgroundColor: '#000',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  appleButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // Modal styles
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 50,
    alignItems: 'center',
  },
  alertText: {
    fontSize: 18,
    fontWeight: 500,
    textAlign: 'center',
    marginBottom: 10,
    color:'red'
  },
  
});

export default Login;


