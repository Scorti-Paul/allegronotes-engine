import expressAsyncHandler from "express-async-handler";
import { TagModel } from "../../database/schemas/tag";

const createTag = async (req: any, res: any) => {
  const { name } = req?.body;

  const tag = await TagModel.findOne({name});

  if(tag) {
    res?.status(400)?.json({
      message: "Tag already exists",
    });
  }

  const newTag = new TagModel({
    name,
  });

  await newTag
    ?.save()
    ?.then((response) => {
      res?.status(201)?.json({
        data: response,
        message: "Tag created successfully",
      });
    })
    ?.catch(() => {
      res?.status(400)?.json({
        message: "There was an error creating this tag",
        // error: handleErrors(err),
      });
    });
};

const updateTag = (req: any, res: any) => {
  if (!req.body) {
    return res.status(400)?.json({
      message: "Data to update cannot be empty",
    });
  }
  const { id, ...rest } = req?.body;

  if (!id) {
    return res?.status(400)?.json({
      message: "id is required to update this data",
    });
  }

  TagModel?.findOneAndUpdate({ _id: id }, rest, {
    useFindAndModify: false,
    new: true,
  })
    ?.then((response) => {
      res?.status(202)?.json({
        data: response,
        message: "Tag updated Successfully",
      });
    })
    ?.catch(() => {
      res?.status(400)?.json({
        message: "There was an error updating tag",
        // error: handleErrors(errors),
      });
    });
};


/**
 * @description Single Tag
 * @route api/tags/:id
 * @access Private
 */
const getTagById = async (model: any, req: any, res: any) => {
  const { id } = req?.query;

  if (!id) {
    return res?.status(400)?.json({
      message: "Provide id to get single data",
    });
  }

  await model?.findById(id)?.then((data: any) => {
    res?.status(200)?.json({
      data,
    });
  });
};

/**
 * @description Get All Categories
 * @route api/categories
 * @access Private
 */
const getTags = async (model: any, _: any, res: any) => {
  await model?.find({})?.then((data: any) => {
    res?.status(200)?.json({
      data,
    });
  });
};



const deleteTag = expressAsyncHandler(async (req: any, res: any) => {
  const {id} = req.params

  if (!id) {
    return res?.status(400)?.json({
      message: "Provide id to get single data",
    });
  }

  await TagModel.findByIdAndDelete({_id: id});
  res.json({ message: "Tag deleted" });
})


export { createTag, updateTag, getTagById, getTags,deleteTag };