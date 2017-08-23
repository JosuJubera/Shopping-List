import { FormControl } from '@angular/forms';

export class EmailValidator {
  
  static isValid(control: FormControl){

    const rex = /^\w+?[\+\w]+@[a-zA-Z_.]+?\.[a-zA-Z]{2,3}$/.test(control.value);
    
    if (rex){
      return null;
    }
    
    return {
      "invalidEmail": true
    };
    
  }
}