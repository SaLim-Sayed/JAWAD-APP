declare module 'react-native-video-controls' {
    import { Component } from 'react';
    import { VideoProperties } from 'react-native-video';
  
    export interface VideoPlayerProps extends VideoProperties {
      source:{uri: string };
      toggleResizeModeOnFullscreen?: boolean;
      controlTimeout?: number;
      showOnStart?: boolean;
      videoStyle?: any;
      navigator?: any;
      tapAnywhereToPause?: boolean;
      fullscreen?: boolean;
      fullscreenOrientation?: 'portrait' | 'landscape';
      resizeMode?: 'contain' | 'cover' | 'fit' | 'stretch';
      
      onEnterFullscreen?: () => void;
      onExitFullscreen?: () => void;
      onBack?: () => void;
      onEnd?: () => void;
      onError?: (error: any) => void;
    }
  
    export default class VideoPlayer extends Component<VideoPlayerProps> {}
  }
  