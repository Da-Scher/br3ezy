import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-videoplayer',
  standalone: true,
  imports: [],
  templateUrl: './videoplayer.component.html',
  styleUrl: './videoplayer.component.css'
})
export class VideoplayerComponent {
  @Input() streamURL: string | undefined;
}