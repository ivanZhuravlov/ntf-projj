const sql = require("./pg");

async function findActiveSubscriptions(userId) {
    return sql`
        select count(certificates.id), subscription_id, subscriptions.data->'product'->>'coaCount' as coaCount
        from  certificates
            inner join subscriptions on subscriptions.id = subscription_id 
        where certificates.user_id = ${userId}
            and subscriptions.terminated_at is null
        group by subscription_id, coaCount;
        `;
}

module.exports = {
    findActiveSubscriptions
}