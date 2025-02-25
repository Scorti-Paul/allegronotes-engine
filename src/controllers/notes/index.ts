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
  const { id } = req.params;

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

  await model
    ?.findById(id)
    ?.populate("category")
    ?.populate("tag")
    ?.then((data: any) => {
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
  await model
    ?.find({})
    ?.populate("category")
    ?.populate("tag")
    ?.then((data: any) => {
      res?.status(200)?.json({
        data,
      });
    });
};

const deleteNote = asyncHandler(async (req: any, res: any) => {
  const { id } = req.params;

  if (!id) {
    return res?.status(400)?.json({
      message: "Provide id to get single data",
    });
  }

  await NoteModal.findByIdAndDelete({ _id: id });
  res.json({ message: "Note deleted" });
});

const filterNotes = async (model: any, req: any, res: any) => {
  try {
    const { category, tag } = req.params;
    let query: any = {};

    if (category) query.category = category;
    if (tag) query.tag = tag;

    const data = await model
      .find(query)
      ?.exec();

    if (!data || data.length === 0) {
      return res.status(404).send("No notes found");
    }
    res?.status(200)?.json({
      data,
    });
  } catch (error) {
    return res.status(400).send("Something went wrong when filtering...");
  }
};

export {
  createNote,
  updateNote,
  getNoteById,
  getNotes,
  deleteNote,
  filterNotes,
};
