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
  },
  { timestamps: true }
);

const NoteModal = model("Note", NoteSchema);
export { NoteModal };
