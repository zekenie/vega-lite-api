export function error(_: string): void {
  throw new Error(_);
}

export function isArray(_: any): boolean {
  return Array.isArray(_);
}

export function isObject(_: any): boolean {
  return _ === Object(_);
}

export function isString(_: any): boolean {
  return typeof _ === "string";
}

export function hasOwnProperty(obj: Object, property: string): boolean {
  return Object.prototype.hasOwnProperty.call(obj, property);
}

export function reduce<T = any, K = any>(
  input: T[] | T,
  value: (item: T | string) => K,
  key?: (item: T) => string
) {
  const items = Array.isArray(input) ? input : Object.keys(input);

  // @ts-expect-error
  return items.reduce((api, item) => {
    const k = key ? key(item) : item;
    api[k] = value(item);
    return api;
  }, {});
}

export function stringValue(_: any): string {
  return Array.isArray(_)
    ? "[" + _.map(stringValue) + "]"
    : isObject(_) || isString(_)
    ? // Output valid JSON and JS source strings.
      // See http://timelessrepo.com/json-isnt-a-javascript-subset
      JSON.stringify(_)
        .replace("\u2028", "\\u2028")
        .replace("\u2029", "\\u2029")
    : _;
}

export interface Emit {
  (s?: string): Emit;
  indent(): Emit;
  outdent(): Emit;
  import(methods: string[] | string, file?: string): Emit;
  code(): string;
}

export function emitter(defaultFile?: string): Emit {
  const imports = { [defaultFile]: {} },
    lines = [];

  let prefix = "";

  const emit = (s) => {
    lines.push(s ? prefix + s : "");
    return emit;
  };

  emit.indent = () => {
    prefix = prefix + "  ";
    return emit;
  };

  emit.outdent = () => {
    prefix = prefix.slice(0, prefix.length - 2);
    return emit;
  };

  emit.import = (methods: string[] | string, file: string) => {
    file = file || defaultFile;
    (Array.isArray(methods) ? methods : [methods]).forEach(
      (m) => ((imports[file] || (imports[file] = {}))[m] = 1)
    );
    return emit;
  };

  emit.code = (): string => {
    const files = Object.keys(imports);

    const code = files.reduce((list, file) => {
      const methods = Object.keys(imports[file]).sort().join(", ");
      list.push(`import {${methods}} from './${file}';`);
      return list;
    }, []);

    return code.concat("", lines).join("\n");
  };

  return emit;
}

export function article(_: string): string {
  return _ && _.match(/^[aeiou]/) ? "an" : "a";
}

export function capitalize(_: string): string {
  let i = 0;
  const p = _[i] === "_" ? (++i, "_") : "";
  const c = _[i];
  return p + c.toUpperCase() + _.slice(++i);
}

export function uppercase(_: string): string {
  return _.toUpperCase();
}

export function code(_: string): string {
  return `<code>${_}</code>`;
}

export function link(_: string): string {
  return `[${_}](${_})`;
}
