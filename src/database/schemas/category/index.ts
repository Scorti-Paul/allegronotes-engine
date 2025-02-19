import mongoose from "mongoose";

// constant enums
const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: mongoose.SchemaTypes.String,
      required: [true, "category name is required"],
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

const CategoryModel = mongoose.model("Category", CategorySchema);
export { CategoryModel };
