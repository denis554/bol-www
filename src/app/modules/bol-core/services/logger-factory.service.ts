import { Injectable } from '@angular/core';


@Injectable()
export class LoggerFactoryService {
    private static readonly LOG_LEVELS = {
        ERROR: 0,
        WARN: 1,
        INFO: 2,
        DEBUG: 3,
        PERF: 4
    };

    private logsLevel: number;

    constructor() {
        // This would come from localStorage or sessionStorage
        this.logsLevel = LoggerFactoryService.LOG_LEVELS.PERF;
    }

    make(namespace: string): Logolous {
        return new LoggerImp({
            namespace,
            debugEnabled: this.logsLevel <= LoggerFactoryService.LOG_LEVELS.DEBUG,
            infoEnabled: this.logsLevel <= LoggerFactoryService.LOG_LEVELS.INFO,
            warnEnabled: this.logsLevel <= LoggerFactoryService.LOG_LEVELS.WARN,
            errorEnabled: this.logsLevel <= LoggerFactoryService.LOG_LEVELS.ERROR,
            nativeLogger: console
        });
    }

}

class LoggerImp implements Logolous {
    private debugEnabled: boolean;
    private infoEnabled: boolean;
    private warnEnabled: boolean;
    private errorEnabled: boolean;
    private namespace: string;
    private nativeLogger: Logolous;

    constructor(config: LoggerConfig) {
        if (!config) throw new Error('config is required');
        if (!config.nativeLogger) throw new Error('config.nativeLogger is required');

        this.nativeLogger = config.nativeLogger;
        this.namespace = config.namespace || '';
        this.debugEnabled = config.debugEnabled || true;
        this.errorEnabled = config.errorEnabled || true;
        this.warnEnabled = config.warnEnabled || true;
        this.infoEnabled = config.infoEnabled || true;
    }

    debug(...args: any[]): void {
        if (!this.debugEnabled) return;
        this.nativeLogger.debug(...this._getParsedArgs(args));
    }

    info(...args: any[]): void {
        if (!this.infoEnabled) return;
        this.nativeLogger.info(...this._getParsedArgs(args));
    }

    warn(...args: any[]): void {
        if (!this.warnEnabled) return;
        this.nativeLogger.warn(...this._getParsedArgs(args));
    }

    error(...args: any[]): void {
        if (!this.errorEnabled) return;
        this.nativeLogger.error(...this._getParsedArgs(args));
    }

    _getParsedArgs(args) {
        if (this.namespace) args = [this._makeIdentifierPrefix(), ...args];
        return args;
    }

    _makeIdentifierPrefix() {
        return `${this.namespace}`;
    }
}

interface LoggerConfig {
    namespace: string;
    debugEnabled: boolean;
    infoEnabled: boolean;
    warnEnabled: boolean;
    errorEnabled: boolean;
    nativeLogger: Logolous;
}

export interface Logolous {
    debug(...args: any[]): void;

    info(...args: any[]): void;

    warn(...args: any[]): void;

    error(...args: any[]): void;
}
