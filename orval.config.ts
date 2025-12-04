import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    input: {
      target: 'swagger.json',
    },
    output: {
      target: 'src/api/generated.ts',
      schemas: 'src/api/model',
      client: 'react-query',
      mode: 'tags-split',
      prettier: true,
    },
  },
});
