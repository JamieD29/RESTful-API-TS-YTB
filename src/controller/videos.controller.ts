import { Request, RequestHandler, Response } from "express";

import Videos from "../models/Videos";
//import { CONNREFUSED } from "dns";

const createVideo: RequestHandler = async (req: Request, res: Response) => {
    const body = {...req.body} 

    //let videos:Videos[]  = [];
   
    for (let i = 0; i < 100 ; i++)
    { 
      let video = await Videos.create(body);
      //videos.push(video);
    }
      try{
      res
      .status(200)
      .json({ message: "Video created successfully" });
      }catch(err){
        res.status(500).json({ message: "Internal server error" });
      }
      
  
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
  const startIndex:number = (pageNum - 1) * limitVideo;
  const endIndex: number = pageNum * limitVideo;
  let previous : Object = {};
  let next : Object = {};
  const allVideos: Videos[] = await Videos.findAll();

  const checkEndIndex: number = allVideos.length % limitVideo === 0 ? 0 : 1;
  const totalPages: number = Math.floor(
    allVideos.length / limitVideo + checkEndIndex
  );

  if (endIndex < allVideos.length) {
    next = {
      page: pageNum + 1,
      limit: limitVideo,
    };
  }

  if (startIndex > 0) {
    previous = {
      page: pageNum - 1,
      limit: limitVideo,
    };
  }

  const videosPerPage: Videos[] = await Videos.findAll({
    limit: limitVideo,
    offset: startIndex,
  });

  return res
    .status(200)
    .json({ totalPages, totalVideos: allVideos.length ,previous, next, items: videosPerPage });
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
      youtube_id: req.params.id,
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
