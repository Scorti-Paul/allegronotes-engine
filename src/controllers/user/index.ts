import { generatePassword, generateSalt, generateSignature } from "../../utils";
import { UserModal } from "../../database/schemas/user";
import { verify } from "jsonwebtoken";

const userSignUp = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    const salt = generateSalt();
    const hashPassword = generatePassword(password, salt);

    const user = new UserModal({
      email,
      password: hashPassword,
      salt,
    });

    user.save();

    res.status(200).json({
      message: "User created successfully",
      user: { email },
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const userLogin = async (req: any, res: any) => {
  try {
    const {email, password} = req.body 

    const user = await UserModal.findOne({email})
    if(!user) throw new Error("User not found")

      const hashPassword = generatePassword(password, user.salt)

      if(hashPassword !== user.password) throw new Error("Password is incorrect")

        const token = generateSignature({
          id: user._id,
          email: user.email
        })
        res.status(200).json({
          token,
          message: "login success..."
        })

  } catch (error) {
    res.status(400).json({
      message: error.message,
    })
  }
}



const verifyToken = (req: any, res: any, next: any) => {
  const authorization = req.headers.authorization?.split(" ");
  const scheme = authorization?.[0].toLowerCase();
  const token = authorization?.[1];

  if (!scheme || scheme !== "bearer") {
    res.status(403).json({
      message: "Unauthorized, Invalid scheme",
    });
    throw new Error("Unauthorized, Invalid scheme");
  }

  if (!token) {
    res.status(403).json({
      message: "Unauthorized, No token provided!",
    });
    throw new Error("Unauthorized, No token provided!");
  }

  //
  verify(token, process.env.APP_SECRET as string, (err: any, decoded: any) => {
    if (err) {
      res.status(401).json({
        message: "Unauthorized!, Invalid token",
      });
      throw new Error("Unauthorized!, Invalid token");
    }
    req.user = decoded;
    next();
  });
};

export {userSignUp, userLogin, verifyToken}