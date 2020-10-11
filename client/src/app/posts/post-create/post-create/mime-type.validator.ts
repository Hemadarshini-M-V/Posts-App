import { AbstractControl } from '@angular/forms';
import { Observable, Observer, of } from 'rxjs';

export function mimeType(control: AbstractControl):
  Observable<{[key:string]:any}> | Promise<{[key:string]:any}> {
    const file = control.value as File;
    const fileReader = new FileReader();
    const fRObs = new Observable((obs: Observer<{[key: string]:any}>)=>{
      fileReader.addEventListener("loadend", () => {
        const arr = new Uint8Array(fileReader.result as ArrayBuffer).subarray(0, 4);
        let header = "";
        let isValid = false;
        for (let i = 0; i < arr.length; i++) {
          header += arr[i].toString(16);
        }
        switch (header) {
          case "89504e47":
          case "ffd8ffe0":
          case "ffd8ffe1":
          case "ffd8ffe2":
          case "ffd8ffe3":
          case "ffd8ffe8": isValid = true; break;
          default: isValid = false; break;
        }
        if (isValid) {
          obs.next(null);
        } else {
          obs.next({ invalidMimeType: true });
        }
        obs.complete();
    });
    fileReader.readAsArrayBuffer(file);
  });
  return fRObs;
}
