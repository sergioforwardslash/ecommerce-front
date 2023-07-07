import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import SequelizeAdapter from "@next-auth/sequelize-adapter";
import sequelize from "@/lib/dbConnection";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  adapter: SequelizeAdapter(sequelize),
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
