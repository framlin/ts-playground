import {Observer} from "./Observer";
import {Observable} from "./Observable";

class Subject<T> implements Observable<T>{
    readonly CLASS_ID: T
    constructor(class_id: T) {
        this.CLASS_ID = class_id;
    }
    _state: T | undefined;
    add(observer: Observer<T>): void{
        this._observers.add(observer);
    };

    set state(value: T | undefined) {
        this._state = value;
        for (let observer of this._observers) {
            observer.signal(this);
        }
    };

    get state(): T | undefined {
        return this._state;
    }

    private _observers = new Set<Observer<T>>();
}
export {Subject}


