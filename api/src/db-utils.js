const sql = require("./pg");

async function findActiveSubscriptions(userId) {
    return sql`
        select count(certificates.id), subscriptions.id, subscriptions.data->'product'->>'coaCount' as coaCount
        from subscriptions 
            left join certificates on subscription_id = subscriptions.id
        where subscriptions.user_id = ${userId}
            and subscriptions.terminated_at is null
        group by subscriptions.id, coaCount;
        `;
}

module.exports = {
    findActiveSubscriptions
}