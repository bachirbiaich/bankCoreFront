import { Injectable } from '@angular/core';
import * as $ from 'jquery';

@Injectable()
export class ErrorsService {
  
  static errors:Array<String> = [];
  constructor() { }

  static addErrorStorage(error:string){
    ErrorsService.loadErrorsOnVariable();
    ErrorsService.errors.push(error);
    localStorage.setItem('errors',JSON.stringify(ErrorsService.errors));
  }

  static getErrorsStorage(){
    ErrorsService.loadErrorsOnVariable();
    let errors = ErrorsService.errors;
    localStorage.removeItem('errors');
    ErrorsService.errors = [];
    return errors;
  }

  private static loadErrorsOnVariable(){
    if(localStorage.getItem('errors'))
      ErrorsService.errors = JSON.parse(localStorage.getItem('errors'));
  }

  static addErrorOnHTML(error:string){
    $("#errorsBloc").append(`<li>${error}</li>`);
    if($("#errorsBloc").parent().hasClass("hidden"))
      $("#errorsBloc").parent().removeClass("hidden");
  }

  static clearErrorsOnHTML(){
    $("#errorsBloc").html("");
    if(!$("#errorsBloc").parent().hasClass("hidden"))
      $("#errorsBloc").parent().addClass("hidden");
  }
}
