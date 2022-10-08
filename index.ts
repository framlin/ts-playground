import {Subject} from './observation/Subject';
import {Observer} from "./observation/Observer";
import {Observatory} from "./observation/Observatory";
import {A, A_CLASS_ID} from "./A";


class B{
    static readonly CLASS_ID = new B(0);
    constructor(public value: number) {}
}
const B_CLASS_ID = new B(0);

class A_Observer extends Observer<A> {
    constructor(class_id: A) {
        super(class_id);
    }

    signal(subject: Subject<A>): void {
        console.log(`A_Observer: ${subject.state.value}`)
    }
}

class B_Observer extends Observer<B> {
    constructor(class_id: B, public observer_id: number) {
        super(class_id);
    }
    signal(subject: Subject<B>): void {
        console.log(`B_Observer (#${this.observer_id}): ${subject.state.value}`)
    }
}

let observatory = new Observatory();

let a_subject = new Subject<A>(A_CLASS_ID);
let a2_subject = new Subject<A>(A_CLASS_ID);
let b_subject = new Subject<B>(B_CLASS_ID);

let a_observer = new A_Observer(A_CLASS_ID);
let b_observer = new B_Observer(B_CLASS_ID, 1);
let b2_observer = new B_Observer(B_CLASS_ID, 2);;


observatory.provide(a_subject);
observatory.provide(a2_subject);
observatory.provide(b_subject);

observatory.subscribe(a_observer);
observatory.subscribe(b_observer);
observatory.subscribe(b2_observer);

let a = new A("hallo");
let a2 = new A("welt");
let b = new B(42);

a_subject.state = a;
b_subject.state = b;
a2_subject.state = a2;
a2_subject.state = new A("foo");
b_subject.state = new B(21);
