create table if not exists public.tasks (
  id text primary key,
  title text not null,
  description text,
  status text not null check (status in ('todo', 'in_progress', 'done')),
  due_at timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_tasks_created_at on public.tasks(created_at desc);
