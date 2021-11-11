create table users
(
	id uuid,
	email text,
	password text,
    stripe text,
    data json default '{}'::json,
    created_at timestamp
);


create table subscriptions
(
    id uuid,
    user_id uuid,
    data json default '{}'::json,
    is_active bool default false,
    created_at timestamp,
    terminated_at timestamp
);