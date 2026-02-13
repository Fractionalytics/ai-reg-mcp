declare module "sql.js" {
  export interface SqlJsStatic {
    Database: new (data?: ArrayLike<number> | Buffer | null) => Database;
  }

  export interface Database {
    run(sql: string, params?: unknown[]): void;
    exec(
      sql: string,
      params?: unknown[]
    ): Array<{ columns: string[]; values: unknown[][] }>;
    prepare(sql: string): Statement;
    each(
      sql: string,
      params: unknown[],
      callback: (row: Record<string, unknown>) => void,
      finalCallback?: () => void
    ): void;
    export(): Uint8Array;
    close(): void;
    getRowsModified(): number;
  }

  export interface Statement {
    bind(values?: unknown[] | Record<string, unknown>): boolean;
    step(): boolean;
    get(params?: unknown[] | Record<string, unknown>): unknown[];
    getAsObject(
      params?: unknown[] | Record<string, unknown>
    ): Record<string, unknown>;
    getColumnNames(): string[];
    reset(): void;
    free(): void;
    getSQL(): string;
  }

  export interface SqlJsConfig {
    locateFile?: (file: string) => string;
  }

  export default function initSqlJs(config?: SqlJsConfig): Promise<SqlJsStatic>;
}
