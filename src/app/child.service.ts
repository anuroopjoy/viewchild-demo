import { Injectable } from '@angular/core';

@Injectable()
export class ChildService {

  constructor() { }

  log() {
    console.log('service logged');
  }
}
