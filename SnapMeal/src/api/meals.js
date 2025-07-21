import { supabase } from '../lib/supabase';

export async function fetchMeals(userId) {
  const { data, error } = await supabase
    .from('meals')
    .select('*')
    .eq('user_id', userId)
    .order('captured_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function addMeal(fields) {
  const { data, error } = await supabase.from('meals').insert(fields).single();
  if (error) throw error;
  return data;
}
