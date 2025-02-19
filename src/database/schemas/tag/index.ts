import mongoose from "mongoose";

// constant enums
const TagSchema = new mongoose.Schema(
  {
    name: {
      type: mongoose.SchemaTypes.String,
      required: [true, "tag name is required"],
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_: any, data: any) {
        delete data.__v;
      },
    },
  }
);

const TagModel = mongoose.model("Tag", TagSchema);
export { TagModel };
