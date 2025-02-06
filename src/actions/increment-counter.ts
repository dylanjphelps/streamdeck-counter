import streamDeck, {
  action,
  DialRotateEvent,
  DidReceiveSettingsEvent,
  KeyDownEvent,
  SingletonAction,
  WillAppearEvent,
} from "@elgato/streamdeck";
import { readFileSync, writeFileSync } from "fs";

@action({ UUID: "com.dylan-phelps.counter.increment" })
export class IncrementCounter extends SingletonAction<CounterSettings> {
  override onWillAppear(
    ev: WillAppearEvent<CounterSettings>,
  ): void | Promise<void> {
    const filePath = ev.payload.settings.filePath;
    if (!filePath) {
      return ev.action.showAlert();
    }

    const fileContent = readFileSync(filePath, "utf-8");
    if (ev.action.isDial()) {
      return ev.action.setFeedback({ value: fileContent ?? "0" });
    }

    return ev.action.setTitle(fileContent ?? "0");
  }

  override onDidReceiveSettings(
    ev: DidReceiveSettingsEvent<CounterSettings>,
  ): Promise<void> | void {
    const filePath = ev.payload.settings.filePath;
    if (!filePath) {
      return ev.action.showAlert();
    }

    const fileContent = readFileSync(filePath, "utf-8");

    if (ev.action.isDial()) {
      return ev.action.setFeedback({ value: fileContent ?? "0" });
    }

    return ev.action.setTitle(fileContent ?? "0");
  }

  override onKeyDown(ev: KeyDownEvent<CounterSettings>): Promise<void> {
    const filePath = ev.payload.settings.filePath;
    if (!filePath) {
      return ev.action.showAlert();
    }

    const fileContent = readFileSync(filePath, "utf-8");

    let count = Number(fileContent ?? 0);
    count = count + (ev.payload.settings.incrementBy ?? 1);

    writeFileSync(filePath, `${count}`);

    // Update the current count in the action's settings, and change the title.
    return ev.action.setTitle(`${count}`);
  }

  override onDialRotate(ev: DialRotateEvent<CounterSettings>): Promise<void> {
    const filePath = ev.payload.settings.filePath;
    if (!filePath) {
      return ev.action.showAlert();
    }

    const fileContent = readFileSync(filePath, "utf-8");
    let count = Number(fileContent ?? 0);

    if (ev.payload.ticks < 0) {
      count = count - 1;
    } else {
      count = count + (ev.payload.settings.incrementBy ?? 1);
    }

    writeFileSync(filePath, `${count}`);

    return ev.action.setFeedback({ value: count });
  }
}

type CounterSettings = {
  incrementBy?: number;
  filePath: string;
};
