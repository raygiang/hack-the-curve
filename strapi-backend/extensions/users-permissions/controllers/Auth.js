const { sanitizeEntity } = require('strapi-utils');

module.exports = {
    async emailConfirmation(ctx, returnUser) {
        const params = ctx.query;

        const decodedToken = await strapi.plugins['users-permissions'].services.jwt.verify(
            params.confirmation
        );

        let user = await strapi.plugins['users-permissions'].services.user.edit(
            { id: decodedToken.id },
            { confirmed: true }
        );

        const settings = await strapi
            .store({
                environment: '',
                type: 'plugin',
                name: 'users-permissions',
                key: 'advanced',
            })
            .get();

        if(returnUser) {
            ctx.send({
                jwt: strapi.plugins['users-permissions'].services.jwt.issue({
                    id: user.id
                }),
                user: sanitizeEntity(user.toJSON ? user.toJSON() : user, {
                    model: strapi.query('user', 'users-permissions').model
                })
            });

            ctx.redirect(settings.email_confirmation_redirection || '/');
        } else {
            ctx.redirect(settings.email_confirmation_redirection || '/');
        }
    }
}