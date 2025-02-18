import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const generateSignature = (payload: any) => {
  return jwt.sign(payload, process.env.APP_SECRET as string, {
    expiresIn: "30d",
  });
};

const generateSalt = () => {
  return bcrypt.genSaltSync();
};

const generatePassword = (password: string, salt: string) => {
  return bcrypt.hashSync(password, salt);
};

export { generatePassword, generateSalt, generateSignature};
