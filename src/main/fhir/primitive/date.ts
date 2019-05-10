import * as primitives from "@tangdrew/primitives";
import * as t from "io-ts";

function pad(n: number): string {
    return n < 10 ? "0" + n : n.toString();
}

function dd(date: Date): string {
    return pad(date.getDate());
}

function mm(date: Date): string {
    return pad(date.getMonth() + 1);
}

function year(date: Date): string {
    return pad(date.getFullYear());
}

export function age(date: Date): number {
    return new Date().getFullYear() - date.getFullYear();
}

export function ageText(date: Date): string {
    return age(date) + " лет";
}

export const defaultDateFormat = "dd.MM.yyyy";
export const iso8601DateFormat = "yyyy-MM-dd";

export function formatDate(date: Date, fmt?: string): t.TypeOf<primitives.R4.DateType> {
    if (isNaN(date.getMilliseconds())) return "";
    const f = fmt || defaultDateFormat;
    return f.replace("dd", dd(date)).replace("MM", mm(date)).replace("yyyy", year(date));
}

export function isValid(date: Date | undefined): boolean {
    return !!(date && !isNaN(date.getTime()));
}

export function parseDate(str: string, fmt?: string): Date | undefined {
    try {
        const f = fmt || defaultDateFormat;
        const yearIndex = f.indexOf("yyyy");
        const year = parseInt(str.substr(yearIndex, 4));
        const mmIndex = f.indexOf("MM");
        const mm = parseInt(str.substr(mmIndex, 2));
        const ddIndex = f.indexOf("dd");
        const dd = parseInt(str.substr(ddIndex, 2));
        return new Date(year, mm - 1, dd);
    } catch (exc) {
        return undefined;
    }
}