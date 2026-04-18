import { describe, it, expect } from 'vitest';
import { parse, removeParams, serialize } from '../src/core/urlParser.js';

describe('parse', () => {
    it('parses a regular URL', () => {
        const url = parse('https://example.com/path?foo=1');
        expect(url).not.toBeNull();
        expect(url.hostname).toBe('example.com');
    });

    it('returns null for an invalid URL', () => {
        expect(parse('not a url')).toBeNull();
        expect(parse('')).toBeNull();
        expect(parse('://broken')).toBeNull();
    });

    it('parses a URL without query string', () => {
        const url = parse('https://example.com/path');
        expect(url).not.toBeNull();
        expect(url.search).toBe('');
    });
});

describe('removeParams', () => {
    it('removes existing parameters and returns their list', () => {
        const url = parse('https://example.com/?utm_source=x&foo=1&fbclid=abc');
        const removed = removeParams(url, ['utm_source', 'fbclid']);
        expect(removed).toEqual(expect.arrayContaining(['utm_source', 'fbclid']));
        expect(url.searchParams.has('utm_source')).toBe(false);
        expect(url.searchParams.has('fbclid')).toBe(false);
        expect(url.searchParams.has('foo')).toBe(true);
    });

    it('does not fail if the parameter is missing in the URL', () => {
        const url = parse('https://example.com/?foo=1');
        const removed = removeParams(url, ['nonexistent']);
        expect(removed).toEqual([]);
    });

    it('returns an empty array if the parameter list is empty', () => {
        const url = parse('https://example.com/?foo=1');
        const removed = removeParams(url, []);
        expect(removed).toEqual([]);
    });

    it('accepts Set as well as array', () => {
        const url = parse('https://example.com/?a=1&b=2&c=3');
        const removed = removeParams(url, new Set(['a', 'c']));
        expect(removed).toEqual(expect.arrayContaining(['a', 'c']));
        expect(url.searchParams.has('b')).toBe(true);
    });
});

describe('serialize', () => {
    it('returns href of the URL object', () => {
        const url = parse('https://example.com/path?foo=1#anchor');
        expect(serialize(url)).toBe('https://example.com/path?foo=1#anchor');
    });

    it('reflects changes after removeParams', () => {
        const url = parse('https://example.com/?a=1&b=2');
        removeParams(url, ['a']);
        expect(serialize(url)).toBe('https://example.com/?b=2');
    });
});
