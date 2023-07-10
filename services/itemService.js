import { sql } from "../database/database.js";

const createItem = async (listId, name) => {
  await sql`INSERT INTO
    shopping_list_items (shopping_list_id, name)
    VALUES (${listId}, ${name})`;
};

const collectItem = async (id) => {
  await sql`UPDATE shopping_list_items
    SET collected = true WHERE id = ${id}`;
};

const countAllItems = async () => {
  const rows = await sql`SELECT COUNT(*) FROM shopping_list_items`;

  return rows[0].count;
};

const findCollected = async (listId) => {
  const rows = await sql`SELECT * FROM shopping_list_items
    WHERE shopping_list_id = ${listId} AND collected IS true
    ORDER BY name`;
    
  if (rows && rows.length > 0) {
    return rows;
  }
    
  return false;
};

const findUncollected = async (listId) => {
  const rows = await sql`SELECT * FROM shopping_list_items
    WHERE shopping_list_id = ${listId} AND collected IS false
    ORDER BY name`;
  
  if (rows && rows.length > 0) {
    return rows;
  }
  
  return false;
};
  
export { createItem, collectItem, countAllItems, findCollected, findUncollected };