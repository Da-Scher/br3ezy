import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';

@Component({
  selector: 'app-videoplayer',
  template: `
    <video #target class="video-js" controls muted playsinline preload="none"></video>
  `,
  styleUrls: [
    './videoplayer.component.css'
  ],
  encapsulation: ViewEncapsulation.None,
  standalone: true,  
})

export class VideoplayerComponent implements OnInit, OnDestroy {
  @ViewChild('target', { static: true })
  target!: ElementRef;

  // See options: https://videojs.com/guides/options
  @Input() options: {
    width: string | number;
    height: string | number;
    fill: boolean;
    fluid: boolean;
    aspectRatio: string;
    autoplay: boolean;
    preload: string;
    controlBar: {
      playToggle: boolean,
      captionsButton: boolean,
      chaptersButton: boolean,            
      subtitlesButton: boolean,
      remainingTimeDisplay: boolean,
      progressControl: {
        seekBar: boolean,
      },
      fullscreenToggle: boolean,
      playbackRateMenuButton: boolean,
  },

    html5: {
      hls: {
        enableLowInitialPlaylist: boolean,
        smoothQualityChange: true,
        overrideNative: boolean,
      },
    },
    sources: {
      src: string;
      type: string;
    }[];
  } | undefined;

  player: any;

  constructor(
    private elementRef: ElementRef,
  ) {}

  // Instantiate a Video.js player OnInit
  ngOnInit() {
    this.player = videojs(this.target.nativeElement, this.options, () => {
      console.log('onPlayerReady', this);
    });
  }

  // Dispose the player OnDestroy
  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
}
