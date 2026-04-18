import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../src/rules/rulesRegistry.js', () => ({
    rulesRegistry: {
        getAll: () => ({
            exactPatterns: new Set(['fbclid', 'gclid', 'msclkid', 'mc_eid', 'igshid']),
            otherRules: [
                { type: 'prefix', pattern: 'utm_', priority: 10 },
            ],
        }),
    },
}));

const { clean } = await import('../src/core/hatsuneMicro.js');

describe('clean — no changes', () => {
    it('returns changed:false if there are no ? and #', () => {
        const result = clean('https://example.com/path');
        expect(result.changed).toBe(false);
        expect(result.removedParams).toEqual([]);
    });

    it('returns changed:false if parameters are not for tracking', () => {
        const result = clean('https://example.com/?foo=1&bar=2');
        expect(result.changed).toBe(false);
    });

    it('returns changed:false for an invalid URL', () => {
        const result = clean('not-a-url?utm_source=x');
        expect(result.changed).toBe(false);
    });
});

describe('clean — query parameters removal', () => {
    it('removes fbclid', () => {
        const result = clean('https://example.com/?fbclid=AbCdEfGh&foo=1');
        expect(result.changed).toBe(true);
        expect(result.removedParams).toContain('fbclid');
        expect(result.cleanUrl).toBe('https://example.com/?foo=1');
    });

    it('removes all utm_ parameters', () => {
        const result = clean('https://example.com/?utm_source=google&utm_medium=cpc&utm_campaign=test&keep=1');
        expect(result.changed).toBe(true);
        expect(result.removedParams).toEqual(expect.arrayContaining(['utm_source', 'utm_medium', 'utm_campaign']));
        expect(result.cleanUrl).toBe('https://example.com/?keep=1');
    });

    it('removes gclid, msclkid, mc_eid, igshid', () => {
        const url = 'https://example.com/?gclid=x&msclkid=y&mc_eid=z&igshid=w';
        const result = clean(url);
        expect(result.changed).toBe(true);
        expect(result.removedParams).toEqual(expect.arrayContaining(['gclid', 'msclkid', 'mc_eid', 'igshid']));
        expect(result.cleanUrl).toBe('https://example.com/');
    });

    it('keeps regular parameters intact', () => {
        const result = clean('https://example.com/?utm_source=x&q=hello&page=2');
        expect(result.cleanUrl).toContain('q=hello');
        expect(result.cleanUrl).toContain('page=2');
        expect(result.cleanUrl).not.toContain('utm_source');
    });

    it('cleanUrl and originalUrl match in originalUrl', () => {
        const url = 'https://example.com/?fbclid=x';
        const result = clean(url);
        expect(result.originalUrl).toBe(url);
    });
});

describe('clean — removal from hash', () => {
    it('removes tracking parameter from hash with ?', () => {
        const result = clean('https://example.com/page#section?fbclid=abc');
        expect(result.changed).toBe(true);
        expect(result.removedParams).toContain('hash:fbclid');
    });

    it('does not touch clean hash anchor', () => {
        const result = clean('https://example.com/page#section');
        expect(result.changed).toBe(false);
    });

    it('removes from hash leaving clean parameters', () => {
        const result = clean('https://example.com/#route?utm_source=x&tab=2');
        expect(result.changed).toBe(true);
        expect(result.cleanUrl).toContain('tab=2');
        expect(result.cleanUrl).not.toContain('utm_source');
    });
});

describe('clean — combinations', () => {
    it('removes from both query and hash simultaneously', () => {
        const result = clean('https://example.com/?fbclid=x&keep=1#ref?utm_source=y');
        expect(result.changed).toBe(true);
        expect(result.removedParams).toContain('fbclid');
        expect(result.removedParams).toContain('hash:utm_source');
        expect(result.cleanUrl).toContain('keep=1');
    });
});
