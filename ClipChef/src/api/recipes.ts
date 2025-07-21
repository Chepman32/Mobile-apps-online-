import { supabase } from '../lib/supabase';

export async function getRecipes() {
  const { data, error } = await supabase.from('recipes').select('*');
  if (error) throw error;
  return data;
}

export async function getRecipe(id: string) {
  const { data, error } = await supabase.from('recipes').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}
