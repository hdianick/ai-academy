/**
 * Accesso ai dati per l'area amministrazione. Le regole di sicurezza (RLS) del database
 * verificano comunque i permessi: queste funzioni non bastano da sole a concedere l'accesso.
 */
import { supabase } from '@/core/supabase/client';
import type { AppRole } from '@/features/auth/store';
import type { PlanTier } from '@/features/courses/types';

import type { AdminProfile, Announcement, ProgressRow } from './types';

function client() {
  if (!supabase) throw new Error('supabase-not-configured');
  return supabase;
}

export async function listProfiles(): Promise<AdminProfile[]> {
  const { data, error } = await client()
    .from('profiles')
    .select('id, display_name, email, role, plan, created_at')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []).map((row) => ({
    id: row.id as string,
    displayName: (row.display_name as string | null) ?? '',
    email: (row.email as string | null) ?? null,
    role: row.role as AppRole,
    plan: row.plan as PlanTier,
    createdAt: row.created_at as string,
  }));
}

export async function updateProfileAccess(
  id: string,
  changes: Partial<{ role: AppRole; plan: PlanTier }>,
): Promise<void> {
  const { error } = await client().from('profiles').update(changes).eq('id', id);
  if (error) throw error;
}

export async function listProgress(): Promise<ProgressRow[]> {
  const { data, error } = await client().from('user_progress').select('user_id, data, updated_at');
  if (error) throw error;
  return (data ?? []).map((row) => ({
    userId: row.user_id as string,
    data: (row.data as ProgressRow['data']) ?? null,
    updatedAt: row.updated_at as string,
  }));
}

function toAnnouncement(row: Record<string, unknown>): Announcement {
  return {
    id: row.id as string,
    title: row.title as string,
    body: (row.body as string | null) ?? '',
    active: Boolean(row.active),
    createdAt: row.created_at as string,
  };
}

export async function listAnnouncements(onlyActive = false): Promise<Announcement[]> {
  let query = client()
    .from('announcements')
    .select('id, title, body, active, created_at')
    .order('created_at', { ascending: false });
  if (onlyActive) query = query.eq('active', true).limit(3);
  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []).map(toAnnouncement);
}

export async function createAnnouncement(input: { title: string; body: string }): Promise<void> {
  const db = client();
  const { data: auth } = await db.auth.getUser();
  const { error } = await db
    .from('announcements')
    .insert({ title: input.title, body: input.body, created_by: auth.user?.id ?? null });
  if (error) throw error;
}

export async function setAnnouncementActive(id: string, active: boolean): Promise<void> {
  const { error } = await client().from('announcements').update({ active }).eq('id', id);
  if (error) throw error;
}

export async function deleteAnnouncement(id: string): Promise<void> {
  const { error } = await client().from('announcements').delete().eq('id', id);
  if (error) throw error;
}
