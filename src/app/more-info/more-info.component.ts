import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrl: './more-info.component.scss'
})
export class MoreInfoComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Title: string,
      content: string
    }
  ) { };
  onCloseClick(): void {

  }
}
