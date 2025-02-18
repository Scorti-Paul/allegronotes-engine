import { Schema, SchemaTypes, model } from "mongoose";

const UserSchema = new Schema(
  {
    firstName: {
      type: SchemaTypes.String,
    },
    surname: {
      type: SchemaTypes.String,
    },
    email: {
      type: SchemaTypes.String,
      unique: true,
      required: [true, "user's email is required"],
    },
    password: {
      type: SchemaTypes.String,
      required: [true, "You must provide your secure password"],
    },
    salt: { type: SchemaTypes.String, required: true },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

UserSchema.virtual("fullname")?.get(function () {
  return this?.firstName + " " + this?.surname;
});

const UserModal = model("User", UserSchema);
export { UserModal };
