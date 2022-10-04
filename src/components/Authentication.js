import { Amplify, Auth } from 'aws-amplify';
import awsconfig from './aws-exports';

class Authentication {

    /*Request Amplify CLI for all services */

    constructor(){
        if(Authentication._instance ){
            return Authentication._instance;
        }
        Authentication._instance = this;
        Amplify.configure(awsconfig);
        this.users = null; 
    }

    async signUp(username,password,email,phone_number) {
        try {
            this.users = await Auth.signup({
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
            return true;
        }catch(error){
            console.log("error occur during sign up",error);
            return false;
        }
    }

    async signIn(username,password) {
        try {
            this.users = await Auth.signIn(username, password);
            return true;
        } catch (error) {
            console.log('error signing in', error);
            return false;
        }
    }

    async signOut() {
        try {
            await Auth.signOut();
            return true;
        } catch (error) {
            console.log('error signing out: ', error);
            return false;
        }
    }

    get_users(){
        return this.users;
    }
        

}

export default Authentication;
