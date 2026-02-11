import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { createClient } from 'jsr:@supabase/supabase-js';

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

const PREFIX_PLACES = "athar:places:";
const PREFIX_REQUESTS = "athar:requests:";
const PREFIX_SETTINGS = "athar:settings:";

// Helper to get auth user
async function getAuthUser(c: any) {
  const authHeader = c.req.header('Authorization');
  if (!authHeader) return null;
  
  const token = authHeader.split(' ')[1];
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') || '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
  );
  
  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) return null;
  return user;
}

// Places API
app.get("/make-server-a17bcab7/places", async (c) => {
  try {
    const places = await kv.getByPrefix(PREFIX_PLACES);
    return c.json(places);
  } catch (error) {
    console.error("Error fetching places:", error);
    return c.json({ error: "Failed to fetch places" }, 500);
  }
});

app.post("/make-server-a17bcab7/places", async (c) => {
  try {
    const body = await c.req.json();
    const id = body.id || crypto.randomUUID();
    const place = { ...body, id, updatedAt: new Date().toISOString() };
    await kv.set(`${PREFIX_PLACES}${id}`, place);
    return c.json(place);
  } catch (error) {
    console.error("Error creating place:", error);
    return c.json({ error: "Failed to create place" }, 500);
  }
});

app.put("/make-server-a17bcab7/places/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const existing = await kv.get(`${PREFIX_PLACES}${id}`);
    if (!existing) return c.json({ error: "Place not found" }, 404);
    
    const updated = { ...existing, ...body, id, updatedAt: new Date().toISOString() };
    await kv.set(`${PREFIX_PLACES}${id}`, updated);
    return c.json(updated);
  } catch (error) {
    console.error("Error updating place:", error);
    return c.json({ error: "Failed to update place" }, 500);
  }
});

app.delete("/make-server-a17bcab7/places/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await kv.del(`${PREFIX_PLACES}${id}`);
    return c.json({ success: true });
  } catch (error) {
    console.error("Error deleting place:", error);
    return c.json({ error: "Failed to delete place" }, 500);
  }
});

// Requests API
app.get("/make-server-a17bcab7/requests", async (c) => {
  try {
    const requests = await kv.getByPrefix(PREFIX_REQUESTS);
    return c.json(requests);
  } catch (error) {
    console.error("Error fetching requests:", error);
    return c.json({ error: "Failed to fetch requests" }, 500);
  }
});

app.post("/make-server-a17bcab7/requests", async (c) => {
  try {
    const body = await c.req.json();
    const id = body.id || crypto.randomUUID();
    const request = { ...body, id, createdAt: new Date().toISOString() };
    await kv.set(`${PREFIX_REQUESTS}${id}`, request);
    return c.json(request);
  } catch (error) {
    console.error("Error creating request:", error);
    return c.json({ error: "Failed to create request" }, 500);
  }
});

app.put("/make-server-a17bcab7/requests/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const existing = await kv.get(`${PREFIX_REQUESTS}${id}`);
    if (!existing) return c.json({ error: "Request not found" }, 404);
    
    const updated = { ...existing, ...body, id };
    await kv.set(`${PREFIX_REQUESTS}${id}`, updated);
    return c.json(updated);
  } catch (error) {
    console.error("Error updating request:", error);
    return c.json({ error: "Failed to update request" }, 500);
  }
});

app.delete("/make-server-a17bcab7/requests/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await kv.del(`${PREFIX_REQUESTS}${id}`);
    return c.json({ success: true });
  } catch (error) {
    console.error("Error deleting request:", error);
    return c.json({ error: "Failed to delete request" }, 500);
  }
});

// Health check endpoint
app.get("/make-server-a17bcab7/health", (c) => {
  return c.json({ status: "ok" });
});

// Settings API
app.get("/make-server-a17bcab7/settings/:key", async (c) => {
  try {
    const key = c.req.param("key");
    const settings = await kv.get(`${PREFIX_SETTINGS}${key}`);
    return c.json(settings || {});
  } catch (error) {
    console.error("Error fetching settings:", error);
    return c.json({ error: "Failed to fetch settings" }, 500);
  }
});

app.post("/make-server-a17bcab7/settings/:key", async (c) => {
  try {
    const key = c.req.param("key");
    const body = await c.req.json();
    await kv.set(`${PREFIX_SETTINGS}${key}`, body);
    return c.json({ success: true, data: body });
  } catch (error) {
    console.error("Error saving settings:", error);
    return c.json({ error: "Failed to save settings" }, 500);
  }
});

Deno.serve(app.fetch);
