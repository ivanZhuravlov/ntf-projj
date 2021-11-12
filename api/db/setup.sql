create database jenko;

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
    token_id text,
    data json default '{}'::json,
    is_active bool default false,
    created_at timestamp,
    terminated_at timestamp
);

create table users_wallet
(
    user_id uuid,
    words text,
    address text,
    created_at timestamp
);

create table artists
(
    address text,
    user_id uuid,
    transaction text,
    data json default '{}'::json,
    is_validate boolean default false,
    created_at timestamp
);


create table certificates
(
    id uuid,
    user_id uuid,
    subscription_id uuid,
    data json default '{}'::json,
    is_validate boolean default false,
    created_at timestamp
);
