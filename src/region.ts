/** US state/territory names to postal codes, so a place written "Texas" folds
 *  to the same "TX" bucket as "TX" and the ISO "US-TX" forms. */
const US_STATE_CODES: Record<string, string> = {
  alabama: 'AL', alaska: 'AK', arizona: 'AZ', arkansas: 'AR', california: 'CA',
  colorado: 'CO', connecticut: 'CT', delaware: 'DE', 'district of columbia': 'DC',
  florida: 'FL', georgia: 'GA', hawaii: 'HI', idaho: 'ID', illinois: 'IL',
  indiana: 'IN', iowa: 'IA', kansas: 'KS', kentucky: 'KY', louisiana: 'LA',
  maine: 'ME', maryland: 'MD', massachusetts: 'MA', michigan: 'MI', minnesota: 'MN',
  mississippi: 'MS', missouri: 'MO', montana: 'MT', nebraska: 'NE', nevada: 'NV',
  'new hampshire': 'NH', 'new jersey': 'NJ', 'new mexico': 'NM', 'new york': 'NY',
  'north carolina': 'NC', 'north dakota': 'ND', ohio: 'OH', oklahoma: 'OK',
  oregon: 'OR', pennsylvania: 'PA', 'rhode island': 'RI', 'south carolina': 'SC',
  'south dakota': 'SD', tennessee: 'TN', texas: 'TX', utah: 'UT', vermont: 'VT',
  virginia: 'VA', washington: 'WA', 'west virginia': 'WV', wisconsin: 'WI',
  wyoming: 'WY', 'puerto rico': 'PR',
};

/**
 * A normalized state/region code read from an iNat free-text place string.
 *
 * `place_guess` trails off with the administrative region then the country,
 * e.g. "Yates Ave, Austin, TX, US". The second-to-last field is the region, but
 * it appears as a code ("TX"), an ISO subdivision ("US-TX"), or a full name
 * ("Texas"); all three fold to a bare "TX". Returns "" when none can be read.
 */
export function region(place?: string | null): string {
  const parts = (place ?? '').split(',').map(p => p.trim()).filter(Boolean);
  if (parts.length < 2) return '';
  let token = parts[parts.length - 2]!;
  if (token.toUpperCase().startsWith('US-')) token = token.slice(3);
  const code = US_STATE_CODES[token.toLowerCase()] ?? token;
  return code.length <= 3 ? code.toUpperCase() : code;
}
