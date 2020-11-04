import React from "react";
import ReactDOM from "react-dom";
import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react-lite";

export class UserStore {
  secondsPassed = 0;
  name = "Sam";

  constructor() {
    makeAutoObservable(this);
  }

  increaseTimer() {
    this.secondsPassed += 1;
  }

  changeName = (value: string) => {
    this.name = value;
  };
}

const user = new UserStore();

setInterval(() => {
  user.increaseTimer();
}, 1000);

// A function component wrapped with `observer` will reacts to any
// future change in an observable it used before
const TimerView = observer(({ user }: { user: UserStore }) => (
  <span>
    Seconds passed: {user.secondsPassed} {user.name}
    <button onClick={() => user.changeName("hallo!")}>Knoppie</button>
  </span>
));

ReactDOM.render(<TimerView user={user} />, document.body);
