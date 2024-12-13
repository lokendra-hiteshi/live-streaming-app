import paths from "../paths";
import VideoPlayer from "../components/video-player";
import AudioPlayer from "../components/audio-player";
import Home from "../pages/home";

export const routes = [
  {
    path: "/",
    component: Home,
    exact: true,
  },
  {
    path: paths.videoPage,
    component: VideoPlayer,
  },
  {
    path: paths.audioPage,
    component: AudioPlayer,
  },
];
