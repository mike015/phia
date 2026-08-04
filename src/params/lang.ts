import type { ParamMatcher } from '@sveltejs/kit';
import localesConfig from '$data/locales.json';

// Optionele taal-prefix: alle NIET-default locale-codes matchen (default = geen prefix).
// Data-gedreven, dus klaar voor meer talen (voeg toe in data/locales.json).
const nonDefault = new Set(
	localesConfig.locales.map((l) => l.code).filter((code) => code !== localesConfig.default)
);

export const match: ParamMatcher = (param) => nonDefault.has(param);
