import { Amplify, Auth } from 'aws-amplify';
import awsconfig from './aws-exports';

class Authentication {

    /*Request Amplify CLI for all services */
    
    constructor(){
        Amplify.configure(awsconfig);
    }

    async signUp(username,password,email,phone_number) {
        try {
            const { user } = await Auth.signup({
                username,
                password,
                attributes:{
                    //Optional, if wanna to add more see amplify doc
                    /*There are some more optional, we need to discuss on how to use */
                    email,
                    phone_number,
                },
            });
            console.log("no error for :",user);
        }catch(error){
            console.log("error occur during sign up",error);
        }
    }

    async signIn() {
        try {
            const user = await Auth.signIn(username, password);
        } catch (error) {
            console.log('error signing in', error);
        }
    }

    async signOut() {
        try {
            await Auth.signOut();
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }
        

}

export default Authentication;
