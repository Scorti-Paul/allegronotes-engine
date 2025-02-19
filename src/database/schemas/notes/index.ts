import { model, Schema, SchemaTypes } from "mongoose";

const NoteSchema = new Schema(
  {
    title: {
      type: SchemaTypes.String,
      required: [true, "Provide note time"],
    },
    content: {
      type: SchemaTypes.String,
      required: [true, "Provide note content"],
    },
    category: {
      type: SchemaTypes.ObjectId, ref: "Category"
    },
    tag: {
      type: SchemaTypes.ObjectId, ref: "Tag"
    },
  },
  { timestamps: true }
);

const NoteModal = model("Note", NoteSchema);
export { NoteModal };
