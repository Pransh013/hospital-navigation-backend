import bcrypt from "bcryptjs";
import { jwtVerify, SignJWT } from "jose";
import { env } from "../config/env.js";
import { TokenPayload } from "../types/index.js";

const SALT_ROUNDS = 10;
const TOKEN_EXPIRY_SECONDS = 60 * 60 * 24 * 7;

const secretKey = new TextEncoder().encode(env.JWT_SECRET);

export const generateToken = async (patient: TokenPayload): Promise<string> => {
  return await new SignJWT(patient)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(`${TOKEN_EXPIRY_SECONDS}s`)
    .setIssuedAt()
    .sign(secretKey);
};

export const verifyToken = async (token: string): Promise<TokenPayload> => {
  const { payload } = await jwtVerify(token, secretKey);
  return payload as TokenPayload;
};

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

export const isValidPassword = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};
