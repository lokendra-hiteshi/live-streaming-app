import paths from "../paths";
import Home from "../pages/home";
import VideoPlayer from "../pages/video-player";
import AudioPlayer from "../pages/audio-player";
import Login from "../pages/login";

export const routes = [
  {
    path: paths.login,
    component: Login,
    exact: true,
  },
  {
    path: paths.home,
    component: Home,
    protected: true,
  },
  {
    path: paths.videoPage,
    component: VideoPlayer,
    protected: true,
  },
  {
    path: paths.audioPage,
    component: AudioPlayer,
    protected: true,
  },
];
