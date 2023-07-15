import { connectToDatabase } from "@/helpers/auth/auth-db";
import { verifyPassword } from "@/helpers/auth/auth-util";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

export default NextAuth({
    providers: [
        Credentials({
            session: {
                jwt: true
            },

            async authorize(credentials) {

                const client = await connectToDatabase();
                const userCollection = client.db().collection('users');
                const user = await userCollection.findOne({ email: credentials.email });

                if (!user) {
                    client.close();
                    throw new Error('No User Found!');
                }

                if (! (await verifyPassword(credentials.password, user.password))) {
                    client.close();
                    throw new Error('Password Incorrect!');
                }

                client.close();
                return { email: user.email };
            }
        })
    ]
})