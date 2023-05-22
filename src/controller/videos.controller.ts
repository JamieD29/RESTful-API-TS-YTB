import { Request, RequestHandler, Response } from "express";

import Videos from "../models/Videos";
//import { CONNREFUSED } from "dns";

const createVideo: RequestHandler = async (req: Request, res: Response) => {
  let video = await Videos.create({ ...req.body });
  return res
    .status(200)
    .json({ message: "Video created successfully", data: video });
};

const deleteVideo: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedVideo: Videos | null = await Videos.findByPk(id);

  await Videos.destroy({ where: { id } });

  return res
    .status(200)
    .json({ message: "Video deleted successfully", data: deletedVideo });
};

const getAllVideos: RequestHandler = async (req: Request, res: Response) => {
  const allVideos: Videos[] = await Videos.findAll();
  return res.status(200).json({
    message: "Videos fetched successfully",
    data: allVideos,
    totalVideos: allVideos.length,
  });
};

const paginationVideos: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { page, limit } = req.query;
  if (page === undefined || limit === undefined) {
    const allVideos: Videos[] = await Videos.findAll();
    return res.status(200).json({
      message: "Videos fetched successfully",
      data: allVideos,
      totalVideos: allVideos.length,
    });
  }

  const pageNum: number = Number(page);
  const limitVideo: number = Number(limit);
  const startIndex = (pageNum - 1) * limitVideo;
  const endIndex = pageNum * limitVideo;
  let previous = {};
  let next = {};
  const allVideos: Videos[] = await Videos.findAll();

  const checkEndIndex = allVideos.length % limitVideo === 0 ? 0 : 1;
  const totalPages = Math.round((allVideos.length / limitVideo) + checkEndIndex);

  if(endIndex < allVideos.length){
    next = {
      page: pageNum + 1,
      limit: limitVideo,
    };
  }

  if(startIndex > 0){
    previous = {
      page: pageNum - 1,
      limit: limitVideo,
    }
  }

  const videosPerPage: Videos[] = await Videos.findAll({
    limit: limitVideo,
    offset: startIndex,
  });

  return res
    .status(200)
    .json({ totalPages, previous, next, data: videosPerPage });
};

const getVideoById: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const video: Videos | null = await Videos.findByPk(id);
  return res
    .status(200)
    .json({ message: "Video fetched successfully", data: video });
};

const updateVideoViews: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const video = await Videos.findOne({
    where: {
      id: req.params.id,
    },
  });

  await video?.set({
    ...video,
    views: video?.views + 1,
  });

  await video?.save();

  return res
    .status(200)
    .json({ message: "Video updated views successfully", data: video });
};

export default {
  createVideo,
  deleteVideo,
  getAllVideos,
  getVideoById,
  updateVideoViews,
  paginationVideos,
};
