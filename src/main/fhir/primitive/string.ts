import * as primitives from "@tangdrew/primitives";
import * as t from "io-ts";
import $ from "jquery";

export function asString(s: t.TypeOf<primitives.R4.StringType> | undefined): string {
    return (s && s.toString()) || "";
}

export function mkString(ar: t.TypeOf<primitives.R4.StringType>[] | undefined): string {
    return (ar && ar.map(s => asString(s)).join(' ')) || "";
}

export function mkStrings(ar: t.TypeOf<primitives.R4.StringType>[] | undefined, s: t.TypeOf<primitives.R4.StringType> | undefined): string {
    const res: t.TypeOf<primitives.R4.StringType>[] = [];
    ar && ar.forEach(s => res.push(s));
    s && res.push(s);
    return mkString(res);
}

export function readString(id: string): t.TypeOf<primitives.R4.StringType> {
    // @ts-ignore
    return $("#" + id).val().toString().trim();
}

export function readArrayString(id: string): t.TypeOf<primitives.R4.StringType>[] {
    return readString(id).split("\\s+");
}