import {Amplify, Auth} from 'aws-amplify';
import awsconfig from '../aws-exports';

class Authentication {

    /*Request Amplify CLI for all services */

    constructor() {
        // init as Singleton
        if (Authentication._instance) {
            return Authentication._instance;
        }
        Authentication._instance = this;
        console.log(this);

        Amplify.configure(awsconfig);
        this.user = null;
        this.email = null;
    }

    async signUp(email, password) {
        const username = email;
        return Auth.signUp({
            username,
            password,
            attributes: {
                //Optional, if wanna to add more see amplify doc
                email
            },
        });
    }

    async confirmSignUp(email, code) {
        return Auth.confirmSignUp(email, code);
    }

    async signIn(email, password) {
        return Auth.signIn(email, password);
    }

    async signOut() {
        return Auth.signOut();
    }
}

export default Authentication;
