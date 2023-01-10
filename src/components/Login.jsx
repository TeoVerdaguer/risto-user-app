import React from 'react';
import {View, Text, Button} from 'react-native';
import {useState, useEffect} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const Login = ({navigation}) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        GoogleSignin.configure({
            webClientId:
            '502547953751-b8jvcbgctrhbugv0g58qa714vcpveo0m.apps.googleusercontent.com',
            offlineAccess: true,
            forceCodeForRefreshToken: true,
        });
        isSignedIn();
    }, []);
    
    const signIn = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          console.log('due____', userInfo);
          setUser(userInfo);
        } catch (error) {
          console.log('Message____', error.message);
          console.log('Message____', error);
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            console.log('User cancelled the login flow');
          } else if (error.code === statusCodes.IN_PROGRESS) {
            console.log('Signing in...');
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            console.log('Play services not available');
          } else {
            console.log('Unknown error');
          }
        }
    };

    const isSignedIn = async () => {
        const isSignedIn = await GoogleSignin.isSignedIn();
        if (!!isSignedIn) {
            getCurrentUserInfo();
        } else {
            console.log('Please login');
        }
    }

    const getCurrentUserInfo = async () => {
        try {
            const userInfo = await GoogleSignin.signInSilently();
            console.log('edit___', user);
            setUser(userInfo);
            console.log(userInfo);
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_REQUIRED) {
                console.log('User has not signed in yet');
            } else {
                console.log('something went wrong.');
            }
        }
    }

    const signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            setUser({});
        } catch (error) {
            console.log(error.code);
        }
    }


    return (
        <View>
        <Text>Login</Text>
        {!user.idToken ? (
          <GoogleSigninButton
            style={{width: 192, height: 48}}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={signIn}
          />
        ) : (
          <TouchableOpacity onPress={signOut}>
            <Text>Signout</Text>
          </TouchableOpacity>
        )}
        </View>
    )
}

export default Login;
