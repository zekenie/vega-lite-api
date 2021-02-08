export function lookup(schema, ref) {
    if (!ref)
        return null;
    const path = ref.split("/");
    for (let i = 1; i < path.length; ++i) {
        schema = schema[path[i]];
        if (schema == null)
            break;
    }
    return schema;
}
export function search(schema, type, check, get, gather, base) {
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
export function props(schema, type) {
    return search(schema, type, (t) => t.type === "object", (t) => t.properties, (a) => Object.assign({}, ...a), () => null);
}
export function enums(schema, type) {
    return search(schema, type, (t) => Boolean(t.const || t.enum), (t) => (t.const || t.enum), (a) => [].concat(...a).sort(), () => []);
}
export function types(schema, type) {
    return search(schema, type, 
    // @ts-expect-error
    (t) => Boolean(t.type === "object" && (t = t.properties) && (t = t.type)), (t) => (t.properties.type.const || t.properties.type.enum || []), (a) => [].concat(...a).sort(), () => []);
}
export function isArrayType(schema) {
    if (hasArrayType(schema)) {
        return 1;
    }
    else if (schema.anyOf || schema.oneOf) {
        let count = 0;
        const toIterate = schema.anyOf || schema.oneOf;
        toIterate.forEach((s) => {
            if (hasArrayType(s))
                ++count;
        });
        return count === toIterate.length ? 1 : count ? 2 : 0;
    }
    else {
        return 0;
    }
}
function hasArrayType({ type, $ref }) {
    return type === "array" || ($ref && $ref.startsWith("#/definitions/Vector"));
}
