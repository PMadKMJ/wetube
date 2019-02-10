/* eslint-disable no-shadow */
import routes from "../routes";
import Video from "../model/Video";

// globalRouter

// 처음 오는 것은 템플릿, 두번째는 오브젝트로 변수를 템플리에 전달하는 방법.
export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({
      _id: -1
    });
    res.render("home", {
      pageTitle: "Home",
      videos
    });
  } catch (error) {
    console.log(error);
    res.render("home", {
      pageTitle: "Home",
      videos: []
    });
  }
};
export const search = async (req, res) => {
  const {
    query: { term: searchingBy }
  } = req;
  let videos = [];
  try {
    videos = await Video.find({
      title: {
        $regex: searchingBy,
        $options: "i"
      }
    });
  } catch (error) {
    console.log(error);
  }
  res.render("search", {
    pageTitle: "Search",
    searchingBy,
    videos
  });
};

// videoRouter
export const video = (req, res) =>
  res.render("video", {
    pageTitle: "Video"
  });

export const getUpload = (req, res) =>
  res.render("upload", {
    pageTitle: "Upload"
  });

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path }
  } = req;
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description
  });
  console.log(newVideo);
  // todo: upload and save video, also fake id
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    res.render("videoDetail", {
      pageTitle: `Edit ${video.title}`,
      video
    });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const getVideoEdit = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    res.render("videoEdit", {
      pageTitle: `Edit ${video.title}`,
      video
    });
  } catch (error) {
    res.redirect(routes.home);
  }
};
export const postVideoEdit = async (req, res) => {
  const {
    params: { id },
    body: { title, description }
  } = req;
  try {
    await Video.findOneAndUpdate(
      {
        _id: id
      },
      {
        title,
        description
      }
    );
    // title, description 은 model/Video 와 videoController에서 이름이 모두 같은 이름으로 해야
    // 모두 연결할 수 있다. MVC 연결 중요!
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    await Video.findOneAndRemove({
      _id: id
    });
  } catch (error) {
    res.redirect(routes.home);
  }
};
