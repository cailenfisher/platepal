import { writable } from "svelte/store";
import { supabase } from "$lib/supabaseClient";

export type Dish = {
    id?: number;
    title: string;
    created_at?: EpochTimeStamp;
    created_by?: string | null;
    type: number;
}

let init:any[] = [];
const store = writable(init)

const loadDishes = async () => {
    const { data, error } = await supabase
        .from('dish')
        .select(`
            type (
                title,
                id
            ),
            title,
            id
        `);
    if (data) store.set(data)
}

const setup = () => {

    supabase
    .channel('any')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'dish' }, payload => {        
        loadDishes()
    })
    .subscribe();

    loadDishes();
}

export const dishStore = {
    subscribe: store.subscribe,
    set: store.set,
    setup: setup
}