export enum Level {
    INFO = "INFO",
    ERROR = "ERROR",
    WARN = "WARN",
}

export interface BuilderI {
    level?: Level;
    message?: string;
    meta?: unknown;

    reset(): void;
    set_message(message: string): this;
    set_level(level: Level): this;
    set_meta(meta: unknown): this;
}

export class Logger implements BuilderI {
    level: Level = Level.INFO;
    message: string = "";
    meta?: unknown;

    constructor() {
        this.reset();
    }

    reset(): void {
        this.level = Level.INFO;
        this.message = "";
        this.meta = undefined;
    }

    set_message(message: string): this {
        this.message = message;
        return this;
    }

    set_level(level: Level): this {
        this.level = level;
        return this;
    }

    set_meta(meta: unknown): this {
        this.meta = meta;
        return this;
    }

    log(): void {
        const base = `[${
            new Date().toISOString()
        }] [${this.level}] ${this.message}`;
        if (this.meta) {
            console.log(base, JSON.stringify(this.meta, null, 2));
        } else {
            console.log(base);
        }
        this.reset();
    }
}
