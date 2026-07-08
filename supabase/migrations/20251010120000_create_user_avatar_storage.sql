-- Create bucket for user avatar uploads
insert into storage.buckets (id, name, public)
values ('user-avatars', 'user-avatars', true)
on conflict (id) do nothing;

-- Allow anyone to read avatar objects (bucket is public)
drop policy if exists "Public read user avatars" on storage.objects;
create policy "Public read user avatars"
on storage.objects for select
using (bucket_id = 'user-avatars');

-- Authenticated users can manage their own avatar objects
drop policy if exists "Users can upload their avatar" on storage.objects;
create policy "Users can upload their avatar"
on storage.objects for insert
with check (bucket_id = 'user-avatars' and auth.uid() = owner);

drop policy if exists "Users can update their avatar" on storage.objects;
create policy "Users can update their avatar"
on storage.objects for update
using (bucket_id = 'user-avatars' and auth.uid() = owner);

drop policy if exists "Users can delete their avatar" on storage.objects;
create policy "Users can delete their avatar"
on storage.objects for delete
using (bucket_id = 'user-avatars' and auth.uid() = owner);
