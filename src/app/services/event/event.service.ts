import {EventEmitter, Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class EventService {
  tokenChange: EventEmitter<string> = new EventEmitter();
  constructor() {}
  emitTokenChangeEvent(token: string) {
    this.tokenChange.emit(token);
  }
  getTokenChangeEmitter() {
    return this.tokenChange;
  }
}
