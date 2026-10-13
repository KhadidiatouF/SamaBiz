export const openApiSpec = {
  openapi: '3.0.3',
  info: {
    title: 'SamaBiz API',
    version: '0.1.0',
    description: 'API REST multi-tenant pour SamaBiz.',
  },
  servers: [{ url: '/api' }],
  components: {
    securitySchemes: {
      bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    },
  },
  paths: {
    '/health': { get: { summary: 'Health check', responses: { '200': { description: 'API disponible' } } } },
    '/auth/register': { post: { summary: 'Inscription avec creation entreprise', responses: { '201': { description: 'Session creee' } } } },
    '/auth/login': { post: { summary: 'Connexion', responses: { '200': { description: 'Session creee' } } } },
    '/clients': {
      get: { security: [{ bearerAuth: [] }], summary: 'Liste paginee des clients', responses: { '200': { description: 'Liste des clients' } } },
      post: { security: [{ bearerAuth: [] }], summary: 'Creation client', responses: { '201': { description: 'Client cree' } } },
    },
    '/clients/{id}': {
      get: { security: [{ bearerAuth: [] }], summary: 'Detail client', responses: { '200': { description: 'Client' } } },
      patch: { security: [{ bearerAuth: [] }], summary: 'Modification client', responses: { '200': { description: 'Client modifie' } } },
      delete: { security: [{ bearerAuth: [] }], summary: 'Suppression client', responses: { '204': { description: 'Client supprime' } } },
    },
    '/dashboard/summary': { get: { security: [{ bearerAuth: [] }], summary: 'Résumé dashboard tenant', responses: { '200': { description: 'Indicateurs' } } } },
  },
};
