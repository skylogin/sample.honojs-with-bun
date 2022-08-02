import { Hono } from "hono";
import { prettyJSON } from 'hono/pretty-json'

import { tokenApi } from './token'

const app = new Hono();
const port = parseInt(process.env.PORT) || 3010;


const home = app.get("/", (c) => {
    return c.json({ message: "Hello 222" });
});
// app.route('/api', middleware)
app.route('/token', tokenApi)


export default {
    port,
    fetch: home.fetch
};