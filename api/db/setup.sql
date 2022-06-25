create database jenko;

create type user_type as enum ('artist', 'gallery', 'collector', 'beneficiary');

create table users
(
    id uuid,
    email text,
    name text,
    password text,
    stripe text,
    data json default '{}'::json,
    type user_type,
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
    token_id text,
    token_uri text,
    subscription_id uuid,
    data json default '{}'::json,
    is_validate boolean default false,
    created_at timestamp
);
