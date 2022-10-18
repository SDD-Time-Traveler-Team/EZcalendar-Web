import { Amplify, Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';

class Authentication {

    /*Request Amplify CLI for all services */

    constructor() {
        // init as Singleton
        if (Authentication._instance) {
            return Authentication._instance;
        }
        Authentication._instance = this;

        Amplify.configure(awsconfig);
        this.user = null;
        this.email = null;
    }

    async signUp(email, password) {
        try {
            const username = email;
            await Auth.signUp({
                username,
                password,
                attributes: {
                    //Optional, if wanna to add more see amplify doc
                    email
                },
            }).then((user) => {
                this.user = user
            });
            console.log("signing up succeeded");
        } catch (error) {
            console.log("error signing up", error);
        }
    }

    async confirmSignUp(email, code) {
        try {
            await Auth.confirmSignUp(email, code).then(() => {
                this.email = email;
            });
        } catch (error) {
            console.log(error);
        }
    }

    async signIn(email, password) {
        try {
            await Auth.signIn(email, password).then(user => {
                this.user = user;
                this.email = email;
                console.log(this.user); // todo: remove me
            }).then((user)=>{
                this.user = user;
            });
        } catch (error) {
            console.log('error signing in', error);
        }
    }

    async signOut() {
        try {
            await Auth.signOut().then(() => {
                this.user = null;
                this.email = null;
            });
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }
}

export default Authentication;
