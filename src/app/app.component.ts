import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  backgroundImage: string = 'assets/default.jpg';

  changeBackground(imageUrl: string): void {
    this.backgroundImage = imageUrl;
  }
}
