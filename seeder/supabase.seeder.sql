-- Create users table
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  role text not null default 'patient'
);

-- Create patients table
create table if not exists public.patients (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  full_name text not null,
  date_of_birth date not null,
  created_at timestamptz default now(),
  email_verified boolean,
  insurance_verified boolean,
  primary key (id)
);

-- Insert a default staff user
insert into public.users (id, email, role)
values (
  'cb1cf710-7476-4c67-b114-2fc0949cfdf3',
  'staff@example.com',
  'staff'
)
on conflict (id) do nothing;

-- Insert a default patient
insert into public.patients (email, full_name, date_of_birth)
values (
  'dm@dumbo.health',
  'Diego Molina',
  '1990-01-01'
)
on conflict (email) do nothing;

-- Enable Row Level Security
alter table public.patients enable row level security;
alter table public.users enable row level security;

-- Policy: Staff can read all patients
create policy "Staff can read all patients"
on public.patients
for select
using (
  exists (
    select 1
    from public.users
    where users.id = auth.uid() and users.role = 'staff'
  )
);

-- Policy: Patients can read their own record
create policy "Patient can read own record"
on public.patients
for select
using (
  email = auth.jwt() ->> 'email'
);

-- Policy: Staff can update patient verification statuses
create policy "Staff can update patients"
on public.patients
for update
using (
  exists (
    select 1
    from public.users
    where users.id = auth.uid() and users.role = 'staff'
  )
);

-- Done!
