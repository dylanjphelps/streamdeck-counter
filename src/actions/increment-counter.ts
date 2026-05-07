import {
  action,
  DialDownEvent,
  DialRotateEvent,
  DialUpEvent,
  DidReceiveSettingsEvent,
  KeyDownEvent,
  KeyUpEvent,
  SingletonAction,
  WillAppearEvent,
} from "@elgato/streamdeck";
import { readFileSync, writeFileSync } from "fs";

@action({ UUID: "com.dylan-phelps.counter.increment" })
export class IncrementCounter extends SingletonAction<CounterSettings> {
  readonly #counts = new Map<string, number>();
  readonly #pressedAt = new Map<string, number>();

  override onWillAppear(ev: WillAppearEvent<CounterSettings>): void | Promise<void> {
    return this.#syncFromFile(ev);
  }

  override onDidReceiveSettings(ev: DidReceiveSettingsEvent<CounterSettings>): void | Promise<void> {
    return this.#syncFromFile(ev);
  }

  override onKeyDown(ev: KeyDownEvent<CounterSettings>): void {
    this.#pressedAt.set(ev.action.id, Date.now());
  }

  override onKeyUp(ev: KeyUpEvent<CounterSettings>): Promise<void> | void {
    const { filePath, incrementBy } = ev.payload.settings;
    if (!filePath) return ev.action.showAlert();

    const elapsed = Date.now() - (this.#pressedAt.get(ev.action.id) ?? Date.now());
    this.#pressedAt.delete(ev.action.id);

    let count = this.#counts.get(ev.action.id) ?? 0;

    if (elapsed >= 5000) {
      count = 0;
    } else if (elapsed >= 1000) {
      count -= 1;
    } else {
      count += incrementBy ?? 1;
    }

    this.#writeCount(ev.action.id, filePath, count);
    return ev.action.setTitle(`${count}`);
  }

  override onDialDown(ev: DialDownEvent<CounterSettings>): void {
    this.#pressedAt.set(ev.action.id, Date.now());
  }

  override onDialUp(ev: DialUpEvent<CounterSettings>): Promise<void> | void {
    const { filePath } = ev.payload.settings;
    if (!filePath) return ev.action.showAlert();

    const elapsed = Date.now() - (this.#pressedAt.get(ev.action.id) ?? Date.now());
    this.#pressedAt.delete(ev.action.id);

    if (elapsed >= 5000) {
      this.#writeCount(ev.action.id, filePath, 0);
      return ev.action.setFeedback({ value: "0" });
    }
  }

  override onDialRotate(ev: DialRotateEvent<CounterSettings>): void | Promise<void> {
    const { filePath, incrementBy } = ev.payload.settings;
    if (!filePath) return ev.action.showAlert();

    let count = this.#counts.get(ev.action.id) ?? 0;
    count += ev.payload.ticks < 0 ? -1 : (incrementBy ?? 1);

    this.#writeCount(ev.action.id, filePath, count);
    ev.action.setFeedback({ value: `${count}` });
  }

  #syncFromFile(
    ev: WillAppearEvent<CounterSettings> | DidReceiveSettingsEvent<CounterSettings>,
  ): void | Promise<void> {
    const { filePath } = ev.payload.settings;
    if (!filePath) return ev.action.showAlert();

    let content: string;
    try {
      content = readFileSync(filePath, "utf-8");
    } catch {
      return ev.action.showAlert();
    }

    const count = Number(content) || 0;
    this.#counts.set(ev.action.id, count);

    if (ev.action.isDial()) {
      return ev.action.setFeedback({ value: `${count}` });
    }
    return ev.action.setTitle(`${count}`);
  }

  #writeCount(actionId: string, filePath: string, count: number): void {
    this.#counts.set(actionId, count);
    writeFileSync(filePath, `${count}`);
  }
}

type CounterSettings = {
  incrementBy?: number;
  filePath: string;
};
