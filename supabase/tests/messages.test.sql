-- pgTAP: public roles can neither read nor write contact messages (07 §7.1, T-DB).
begin;
select plan(7);

select has_table('public', 'messages', 'messages table exists');
select is(
  (select relrowsecurity from pg_class where oid = 'public.messages'::regclass),
  true,
  'RLS is enabled on messages'
);

-- The server (service role) can insert.
set local role service_role;
insert into public.messages (name, email, body, ip_hash)
values ('Rina K.', 'rina@example.com', 'Hello, I would like to talk about a role.', repeat('a', 64));
select is((select count(*)::int from public.messages), 1, 'service role can insert');
reset role;

set local role anon;
select throws_ok(
  $$ select * from public.messages $$,
  '42501', null, 'anon cannot read messages'
);
select throws_ok(
  $$ insert into public.messages (name, email, body, ip_hash) values ('Bot', 'b@x.io', repeat('x', 30), repeat('b', 64)) $$,
  '42501', null, 'anon cannot insert messages'
);
reset role;

set local role authenticated;
select throws_ok(
  $$ select * from public.messages $$,
  '42501', null, 'signed-in guests cannot read messages'
);
reset role;

-- Constraints reject junk even from trusted code.
set local role service_role;
select throws_ok(
  $$ insert into public.messages (name, email, body, ip_hash) values ('R', 'nope', 'short', 'x') $$,
  '23514', null, 'check constraints reject invalid rows'
);

select * from finish();
rollback;
