import config from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appWriteUrl)
            .setProject(config.appProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return this.login({ email, password }); // ✅ Fixed: Added await
            }
            return userAccount;
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async currentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: currentUser :: error", error);
            return null; // ✅ Explicitly return null
        }
    }

    async logout() {
        try {
            const user = await this.currentUser(); // ✅ Check if user exists before logging out
            if (user) {
                await this.account.deleteSessions();
                console.log("User logged out successfully.");
            } else {
                console.log("No active session found.");
            }
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }
}

const authService = new AuthService();
export default authService;
