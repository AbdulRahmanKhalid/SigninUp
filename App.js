import React, { useState, Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
  View,
  ActivityIndicator,
  Image
} from 'react-native';

const API_URL = 'http://10.0.2.2:3000';
const image = '';

export default function App()  {
    // // Declare a new state variable
    const [isLogin, setLogin] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setErrortext] = useState('');

    const onChangeHandler= ()=>{
        setLogin(!isLogin)
        if(isLogin) setName("");
    }
    const onSubmitHandler = () => {
        setErrortext('');
        if (!email) {
          alert('Please fill Email');
          return;
        }
        if (!password) {
          alert('Please fill Password');
          return;
        }
        if (!isLogin && !name) {
            alert('Please fill Name');
            return;
          }
          
        const userData = {email, name, password};
        if(isLogin){
            fetch(`${API_URL}/getUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            })
            .then(async res => { 
                try {
                    const jsonRes = await res.json();
                   
                    if (res.status === 200) {
                        
                    alert('Welcome ' +jsonRes.name);
                    } 
                    else {
                        alert(jsonRes.message);
                    }
                } catch (err) {
                    console.log(err);
                };
            })
            .catch(err => {
                console.log(err);
            });
        }
        else{
        fetch(`${API_URL}/send`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
        .then(async res => { 
            try {
                const jsonRes = await res.json();
               
                if (res.status === 200) {
                    alert(jsonRes.message );
                } 
                else {
                    alert(jsonRes.message);
                }
            } catch (err) {
                console.log(err);
            };
        })
        .catch(err => {
            console.log(err);
        });
    }
    };
    return (
       
            <View style={styles.container}>
                 <Image source={require('./BGIMG.png')} resizeMode="center" style={styles.image}></Image>
            <Text style={styles.heading}>{isLogin ? 'Login' : 'Sign up'}</Text>
            <View style={styles.form}>
                <View style={styles.inputs}>
                    <TextInput style={styles.input} placeholder="Email" autoCapitalize="none" onChangeText={setEmail}></TextInput>
                    {!isLogin && <TextInput style={styles.input} placeholder="Name" onChangeText={setName}></TextInput>}
                    <TextInput secureTextEntry={true} style={styles.input} placeholder="Password" onChangeText={setPassword}></TextInput>
                    <TouchableOpacity style={styles.button} onPress={onSubmitHandler}>
                        <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Sign up'}</Text>
                    </TouchableOpacity>
                    <View style={styles.cnahgeHandlerContainer}>
                        <Text  style={styles.message}>{isLogin ? "Don't have an account? " : 'Already have an account? '}</Text>
                        <Text onPress={onChangeHandler} style={[styles.message, {color: 'blue'}]}>{isLogin ? 'Sign up' : 'Login '}</Text>
                    </View>  
                </View>  
            </View>
        </View>
    );
  }
  
var styles = StyleSheet.create({
image: {
    height:130,
    marginTop:'10%',
    alignSelf:'center'
},
container: {
    flex: 1,
    borderRadius: 20
},
heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: '10%',
    color: 'black',
},
form: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: '5%',
},
inputs: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '10%',
},  
input: {
    width: '80%',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    paddingTop: 10,
    fontSize: 16, 
    minHeight: 40,
},
button: {
    width: '80%',
    backgroundColor: '#00e600',
    height: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: "5%",
},
buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '400'
},
message: {
    fontSize: 16,
    marginVertical: '5%',
},
cnahgeHandlerContainer:{
    flex:1,
    flexDirection: 'row',
},
});
