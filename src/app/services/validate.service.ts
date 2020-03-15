import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateRegister(user){
    if (user.name == undefined || user.email == undefined || user.tel == undefined || user.password == undefined || user.role == undefined) {
      return false;
    } else {
      return true;
    }
  }

  validateLogin(user){
    if (user.password == undefined || user.password.replace(/\s/g, '').length < 8 ||
        user.email == undefined || !user.email.replace(/\s/g, '').length ) {
      return false;
    } else {
      return true
    }
  }

  validateEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }


  validatePassword(password){
    if (password == undefined || password.replace(/\s/g, '').length < 8 ) {
      return false;
    } else {
      return true
    }
  }

  validatePhone(tel){
    const re = /^(\((00|\+)39\)|(00|\+)39)?(38[890]|34[4-90]|36[680]|33[13-90]|32[89]|35[01]|37[019])(\s?\d{3}\s?\d{3,4}|\d{6,7})$/;
    return re.test(tel);
  }

  validateMessage(message){
    if (message.text == undefined || !message.text.replace(/\s/g, '').length) {
      return false;
    } else {
      return true;
    }
  }
}