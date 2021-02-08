import { JsonSchema } from "./schema-interface";

type Maybe<T> = null | T;

export function lookup(schema: JsonSchema, ref: string) {
  if (!ref) return null;

  const path = ref.split("/");
  for (let i = 1; i < path.length; ++i) {
    schema = schema[path[i]];
    if (schema == null) break;
  }
  return schema;
}

export function search<T>(
  schema: JsonSchema,
  type: JsonSchema,
  check: (type: JsonSchema) => boolean,
  get: (type: JsonSchema) => T,
  gather: (type: JsonSchema[]) => T,
  base: () => Maybe<JsonSchema[]>
) {
  let t;
  return !type
    ? base()
    : type.$ref
    ? search(schema, lookup(schema, type.$ref), check, get, gather, base)
    : check(type)
    ? get(type)
    : (t = type.anyOf || type.allOf || type.oneOf)
    ? gather(t.map((_) => search(schema, _, check, get, gather, base)))
    : base();
}

export function props(schema: JsonSchema, type: JsonSchema): JsonSchema {
  return search<JsonSchema>(
    schema,
    type,
    (t) => t.type === "object",
    (t) => t.properties,
    (a) => Object.assign({}, ...a),
    () => null
  );
}

export function enums(schema: JsonSchema, type) {
  return search<string[]>(
    schema,
    type,
    (t) => Boolean(t.const || t.enum),
    (t) => (t.const || t.enum) as string[],
    (a) => [].concat(...a).sort(),
    () => []
  );
}

export function types(schema: JsonSchema, type) {
  return search<string[]>(
    schema,
    type,
    // @ts-expect-error
    (t) => Boolean(t.type === "object" && (t = t.properties) && (t = t.type)),
    (t) =>
      (t.properties.type.const || t.properties.type.enum || []) as string[],
    (a) => [].concat(...a).sort(),
    () => []
  );
}

export function isArrayType(schema: JsonSchema) {
  if (hasArrayType(schema)) {
    return 1;
  } else if (schema.anyOf || schema.oneOf) {
    let count = 0;
    const toIterate = schema.anyOf || schema.oneOf;
    toIterate.forEach((s) => {
      if (hasArrayType(s)) ++count;
    });
    return count === toIterate.length ? 1 : count ? 2 : 0;
  } else {
    return 0;
  }
}

function hasArrayType({ type, $ref }: JsonSchema) {
  return type === "array" || ($ref && $ref.startsWith("#/definitions/Vector"));
}
