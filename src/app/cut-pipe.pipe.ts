import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cut'
})
export class CutPipePipe implements PipeTransform {

  transform(value: string, ...args: any[]): string {
    //The first argument is for the length and if no argument is passed
    //the default value is 30
    const limit = args.length > 0 ? parseInt(args[0],10):40;
    //The second argument is reffered for the trail and if 
    //no argument is passed the default value is ...
    const end = args.length > 1 ? args[1] : '...';
    //If the string value is empty string or only spaces returns
    //no description
    if(value.trim().length === 0) {
      return "-No description-";
    }
    //If the string 'value' is shorter than the limit just pass
    //the value if it's longer cut from the first to the 39-th 
    //symbol including and adds the end
    return value.length > limit ? value.substring(0,limit) + end : value;
  }

}
