import * as primitives from "@tangdrew/primitives";
import * as t from "io-ts";

export function asString(s: t.TypeOf<primitives.R4.CodeType> | undefined): string {
    return (s && s.toString()) || "";
}

export function mkString(ar: t.TypeOf<primitives.R4.CodeType>[] | undefined): string {
    return (ar && ar.map(s => asString(s)).join(' ')) || "";
}