import {mkdir, writeFile} from 'node:fs/promises';
import {dirname} from 'node:path';

const SPEC_URL = 'https://api.inaturalist.org/v2/api-docs';
const OUTPUT_PATH = 'node_modules/.cache/inaturalist.openapi.json';

interface QueryParameter {
  in: 'query';
  name: string;
  schema: {enum: string[]};
  description: string;
}

interface SpecPatch {
  path: string;
  method: 'get';
  parameter: QueryParameter;
}

const PATCHES: SpecPatch[] = [
  {
    path: '/observations',
    method: 'get',
    parameter: {
      in: 'query',
      name: 'return_bounds',
      schema: {enum: ['true', 'false']},
      description: 'Include total_bounds of matching observations. Missing upstream: inaturalist/iNaturalistAPI openapi/schema/request/observations_search.js',
    },
  },
];

const applyPatch = (spec: any, {path, method, parameter}: SpecPatch) => {
  const parameters: {name?: string}[] = spec.paths[path][method].parameters;
  if (parameters.some(existing => existing.name === parameter.name)) {
    throw new Error(`${parameter.name} is now in the upstream spec for ${method.toUpperCase()} ${path}; remove this patch`);
  }
  parameters.push(parameter);
};

const response = await fetch(SPEC_URL);
if (!response.ok) throw new Error(`Fetching ${SPEC_URL} failed: ${response.status} ${response.statusText}`);
const spec = await response.json();
PATCHES.forEach(patch => applyPatch(spec, patch));
await mkdir(dirname(OUTPUT_PATH), {recursive: true});
await writeFile(OUTPUT_PATH, JSON.stringify(spec, null, 2) + '\n');
console.log(`Wrote ${OUTPUT_PATH} with ${PATCHES.length} patch(es)`);
