export default function (Joi) {
  return Joi.object({
    enabled: Joi.boolean().default(true),
    serverHost: Joi.string().hostname().default('localhost'),
    serverPort: Joi.number().integer().default(3030),
    serverSsl: Joi.boolean().default(false),
    disabledEndpoints: Joi.array().items(Joi.alternatives().try(
      Joi.object({
        path: Joi.string(),
        method: Joi.alternatives().try(Joi.array().items(Joi.string()), Joi.string())
      })),
      Joi.string()
    ).default(['status/control/*'])
  }).default();
}
