import { Amplify, Auth } from 'aws-amplify';
// import awsconfig from '../aws-exports';

class Authentication {

    /*Request Amplify CLI for all services */

    constructor() {
        // init as Singleton
        if (Authentication._instance) {
            return Authentication._instance;
        }
        Authentication._instance = this;

        // Amplify.configure(awsconfig);
        this.user = null;
    }

    async signUp(email, password) {
        try {
            this.user = await (await Auth.signUp({
                email,
                password,
                attributes: {
                    //Optional, if wanna to add more see amplify doc
                    email
                },
            })).user;
        } catch (error) {
            console.log("error signing up", error);
        }
    }

    async signIn(email, password) {
        try {
            this.user = await (await Auth.signIn(email, password)).user;
        } catch (error) {
            console.log('error signing in', error);
        }
    }

    async signOut() {
        try {
            await Auth.signOut();
            this.user = null;
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }
}

export default Authentication;
