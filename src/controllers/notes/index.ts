import { NoteModal } from "./../../database/schemas/notes";
const asyncHandler = require("express-async-handler");

/**
 * @description Create Note
 * @route api/note/create
 * @access Private
 */
const createNote = asyncHandler(async (req: any, res: any) => {
  const createNewNote = await NoteModal.create({ ...req.body });

  if (createNewNote) {
    res.status(201).json({
      message: "Note created successfully...",
    });
  } else {
    res.status(401);
    throw new Error("Encountered error creating note...");
  }
});

/**
 * @description Update Note
 * @route api/note/update/:id
 * @access Private
 */
const updateNote = asyncHandler(async (req: any, res: any) => {
  if (!req.body) {
    return res.status(400)?.json({
      message: "Data to update cannot be empty",
    });
  }
  const {id} = req.params

  const { ...rest } = req.body;

  if (!id) {
    return res.status(400)?.json({
      message: "Note ID is required to update this data",
    });
  }

  NoteModal?.findOneAndUpdate({ _id: id }, rest, {
    useFindAndModify: false,
    new: true,
  })
    ?.then((response) => {
      res?.status(202)?.json({
        data: response,
        message: "Note updated Successfully",
      });
    })
    ?.catch(() => {
      res?.status(400);
      throw new Error("There was an error updating Note");
    });
});

/**
 * @description Single Note
 * @route api/notes/:id
 * @access Private
 */
const getNoteById = async (model: any, req: any, res: any) => {
  const { id } = req?.params;

  if (!id) {
    return res?.status(400)?.json({
      message: "Provide id to get single data",
    });
  }

  await model?.findById(id)?.populate("category")?.populate("tag")?.then((data: any) => {
    res?.status(200)?.json({
      data,
    });
  });
};

/**
 * @description Get All Notes
 * @route api/notes
 * @access Private
 */
const getNotes = async (model: any, _: any, res: any) => {
  await model?.find({})?.populate("category")?.populate("tag")?.then((data: any) => {
    res?.status(200)?.json({
      data,
    });
  });
};

const deleteNote = asyncHandler(async (req: any, res: any) => {
  const {id} = req.params

  if (!id) {
    return res?.status(400)?.json({
      message: "Provide id to get single data",
    });
  }

  await NoteModal.findByIdAndDelete({_id: id});
  res.json({ message: "Note deleted" });
})

// const filterNotes = async (model: any, req: any, res: any) => {
//   const { search = {}, ...query } = req.body;
//   console.log(search)
//   const key = search ? Object.keys(search)[0] : "";
//   const value = search ? Object.values(search)[0] : undefined;
//  console.log("Typeof: " + typeof(key))
//   try {
//     const notes = await model
//       .find({
//         ...query,
//         [`${key}`]: { $regex: value, $options: "i" },
//       })
//       ?.exec();

//     if (!notes || notes.length === 0) {
//       return res.status(404).send("No notes found");
//     }
//   } catch (error) {
//     console.error("Error generating Excel:", error);
//     res.status(500).send("Internal Server Error");
//   }
// };

const filterNotes = async (model: any, req: any, res: any) => {
  try {
    const { search = {}, ...query } = req.body;
    console.log("Search Object:", search);

    // Get search key and value
    const key = Object.keys(search)[0] || "";
    let value = Object.values(search)[0];

    console.log("Typeof key:", typeof key);
    console.log("Typeof value before conversion:", typeof value);

    // Ensure value is a string
    if (value !== undefined && value !== null) {
      value = String(value);
    } else {
      value = "";
    }

    console.log("Typeof value after conversion:", typeof value, "Value:", value);

    const notes = await model
      .find({
        ...query,
        [key]: { $regex: value, $options: "i" },
      })
      .exec();

    if (!notes || notes.length === 0) {
      return res.status(404).send("No notes found");
    }

    res.json(notes);
  } catch (error) {
    console.error("Error filtering notes:", error);
    res.status(500).send("Internal Server Error");
  }
};


export { createNote, updateNote, getNoteById, getNotes, deleteNote, filterNotes };
