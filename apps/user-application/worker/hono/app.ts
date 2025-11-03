import { Hono } from "hono";


export const App = new Hono<{
    Bindings: ServiceBindings;
    Variables: { userId: string };
}>();



App.get("/click-socket", async (c) => {
    const userId = c.get("userId") || "12345678";
    const headers = new Headers(c.req.raw.headers);
    headers.set("account-id", userId);
    const proxiedRequest = new Request(c.req.raw, { headers });
    return c.env.BACKEND_SERVICE.fetch(proxiedRequest);
});

