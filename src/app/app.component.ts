import { Component } from '@angular/core';
import { ErrorsService } from './Services/errors/errors.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  errors:Array<String> = ErrorsService.getErrorsStorage();
}
