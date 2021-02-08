const Data = Symbol('data');
let id_counter = 0;

export function id(prefix: string) {
  return (prefix || "") + ++id_counter;
}

export class BaseObject {
  toObject() { return toObject(this); }
}

export function assign(target, ...sources) {
  if (sources.length === 1 && Array.isArray(sources[0])) {
    target[Data] = sources[0];
  } else {
    sources.forEach(s => {
      Object.assign(target[Data], isObject(s) && s[Data] || s)
    });
  }
  return target;
}

export function flat<T = any>(value: T[]): T[] {
  return Array.isArray(value) ? [].concat(...value) : value;
}

export function get<T = any>(obj: T, name: keyof T) {
  return obj[Data][name];
}

export function set<T = any>(obj: T, name: keyof T, value: any) {
  obj[Data][name] = object(value);
}

export function copy<T>(obj: T): T {
  const mod = Object.create(Object.getPrototypeOf(obj));
  Object.assign(mod, obj);
  mod[Data] = Object.assign({}, obj[Data]);
  return mod;
}

export function init(obj, value) {
  obj[Data] = value || {};
}

function recurse(d, flag?) {
  return d && d.toObject ? d.toObject(flag) : toObject(d);
}

function toObject(value) {
  if (isArray(value)) {
    return value.map(d => recurse(d));
  } else if (isObject(value)) {
    const data = value[Data] || value;
    return isArray(data)
      ? recurse(data)
      : Object.keys(data).reduce((_, k) => {
          _[k] = recurse(data[k]);
          return _;
        }, {});
  } else {
    return value;
  }
}

export function raw(value) {
  return { [Data]: value, toObject: () => value };
}

function object(value) {
  return (isObject(value) && !value[Data]) ? {[Data]: value || {}} : value;
}

export function merge(flag, ...values) {
  const objects = [].concat(...values).map(_ => recurse(_, flag));
  return object(Object.assign({}, ...objects));
}

export function nest(obj, keys, rest) {
  const m = keys.reduce((m, k) => (m[k] = 1, m), {}),
        u = {}, v = {};

  for (let k in obj) (m[k] ? u : v)[k] = obj[k];
  u[rest] = v;
  return u;
}

// -- type checkers --

export const isArray = Array.isArray;

export function isBoolean(_: any): boolean {
  return typeof _ === "boolean";
}

export function isIterable(_: any): boolean {
  return isObject(_) && typeof _[Symbol.iterator] === "function";
}

export function isNumber(_: any): boolean {
  return typeof _ === "number";
}

export function isObject(_: any): boolean {
  return _ === Object(_) && !isArray(_);
}

export function isString(_: any): boolean {
  return typeof _ === "string";
}
