'use strict';

const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async create(ctx) {
        let entity;

        if (ctx.is('multipart')) {
            const { data, files } = parseMultipartData(ctx);
            entity = await strapi.services.emails.create(data, { files });
        }
        else {
            entity = await strapi.services.emails.create(ctx.request.body);
        }

        let entry = sanitizeEntity(entity, { model: strapi.models.emails });

        await strapi.plugins['email'].services.email.send({
            to: 'raymond@axesscreative.ca',
            from: 'admin@axesscreative.ca',
            subject: 'Use strapi email provider successfully',
            text: `message was: ${entry.content}`,
        });

        return entry;
    },
};
