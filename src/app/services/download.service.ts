import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor() { }


  downloadTextFile(content:string) {
    const blob = new Blob([content], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'EMI_RESULT.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
