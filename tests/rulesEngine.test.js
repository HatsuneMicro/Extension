import { describe, it, expect } from 'vitest';
import { getParamsToRemove } from '../src/rules/rulesEngine.js';

function makeRules({ exact = [], prefix = [], regex = [] } = {}) {
    return {
        exactPatterns: new Set(exact),
        otherRules: [
            ...prefix.map(p => ({ type: 'prefix', pattern: p, priority: 10 })),
            ...regex.map(r => ({ type: 'regex', pattern: r, priority: 10, _compiled: new RegExp(r, 'i') })),
        ],
    };
}

describe('getParamsToRemove — exact', () => {
    it('removes exact matches', () => {
        const params = new URLSearchParams('fbclid=abc&foo=1&gclid=xyz');
        const rules = makeRules({ exact: ['fbclid', 'gclid'] });
        const result = getParamsToRemove(params, rules);
        expect([...result]).toEqual(expect.arrayContaining(['fbclid', 'gclid']));
        expect(result.has('foo')).toBe(false);
    });

    it('does not touch parameters not in the list', () => {
        const params = new URLSearchParams('foo=1&bar=2');
        const rules = makeRules({ exact: ['fbclid'] });
        expect(getParamsToRemove(params, rules).size).toBe(0);
    });
});

describe('getParamsToRemove — prefix', () => {
    it('removes parameters by utm_ prefix', () => {
        const params = new URLSearchParams('utm_source=google&utm_medium=cpc&foo=1');
        const rules = makeRules({ prefix: ['utm_'] });
        const result = getParamsToRemove(params, rules);
        expect(result.has('utm_source')).toBe(true);
        expect(result.has('utm_medium')).toBe(true);
        expect(result.has('foo')).toBe(false);
    });

    it('does not trigger on partial match in the middle', () => {
        const params = new URLSearchParams('notutm_source=x');
        const rules = makeRules({ prefix: ['utm_'] });
        expect(getParamsToRemove(params, rules).size).toBe(0);
    });
});

describe('getParamsToRemove — regex', () => {
    it('removes parameters by regular expression', () => {
        const params = new URLSearchParams('ref_abc=1&referer=2&foo=3');
        const rules = makeRules({ regex: ['^ref'] });
        const result = getParamsToRemove(params, rules);
        expect(result.has('ref_abc')).toBe(true);
        expect(result.has('referer')).toBe(true);
        expect(result.has('foo')).toBe(false);
    });

    it('regex is case-insensitive', () => {
        const params = new URLSearchParams('UTM_SOURCE=x');
        const rules = makeRules({ regex: ['^utm_'] });
        expect(getParamsToRemove(params, rules).has('UTM_SOURCE')).toBe(true);
    });
});

describe('getParamsToRemove — empty cases', () => {
    it('returns an empty Set for empty params', () => {
        const params = new URLSearchParams('');
        const rules = makeRules({ exact: ['fbclid'], prefix: ['utm_'] });
        expect(getParamsToRemove(params, rules).size).toBe(0);
    });

    it('returns an empty Set for empty rules', () => {
        const params = new URLSearchParams('fbclid=x&utm_source=y');
        const rules = makeRules();
        expect(getParamsToRemove(params, rules).size).toBe(0);
    });
});
