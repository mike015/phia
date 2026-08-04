import type { ParamMatcher } from '@sveltejs/kit';

/** Optionele taal-prefix: alleen 'en' matcht. NL is default zonder prefix. */
export const match: ParamMatcher = (param): param is 'en' => {
	return param === 'en';
};
