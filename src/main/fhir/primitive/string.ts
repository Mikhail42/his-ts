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

function toR4String(text: string | number | string[] | undefined): t.TypeOf<primitives.R4.StringType> | undefined {
    return text !== undefined ? text.toString().trim() : undefined;
}

export function readSpan(id: string): t.TypeOf<primitives.R4.StringType> | undefined {
    const span: JQuery<HTMLSpanElement> = $("#" + id);
    return toR4String(span.text());
}

export function readInput(id: string): t.TypeOf<primitives.R4.StringType> | undefined {
    const input: JQuery<HTMLInputElement> = $("#" + id);
    return toR4String(input.val());
}

export function readSelect(id: string): t.TypeOf<primitives.R4.StringType> | undefined {
    const select: JQuery<HTMLSelectElement> = $("#" + id);
    return toR4String($(select[0].selectedOptions[0]).val());
}