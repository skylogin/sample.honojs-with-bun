import { Hono } from 'hono'
// import * as service from './service'
// import { cors } from 'hono/cors'

import { soleToken } from "sole-token";
import { dbInsert, dbAll, dbSearch, dbDelete, dbUpdate } from './db'; 

const tokenApi = new Hono()
// tokenApi.use('/token/*', cors())

tokenApi.get('/', async (c) => {
    const tokens = dbAll();

    return c.json({ token: tokens, ok: true })
});

tokenApi.get('/:token', async (c) => {
    const { token } = c.req.param();
    const result = dbSearch(token);

    return c.json({ token: result, ok: true })
});

tokenApi.put('/', async (c) => {
    let Token = soleToken({});
    while(dbSearch(Token) !== null) {
        Token = soleToken({});
    }
    dbInsert(Token);

    return c.json({ token: Token, ok: true })
});

tokenApi.post('/:token', async (c) => {
    const { token } = c.req.param();
    const param = await c.req.parseBody();
    const changeName = param.changeName;

    if(!_isExist(token)){
        return _noContentResponse();
    }
    dbUpdate(token, changeName);

    return c.json({ token: changeName, ok: true });
});

// bun 버그 (https://github.com/oven-sh/bun/issues/677)
tokenApi.delete('/:token', async (c) => {
    const { token } = c.req.param();

    if(!_isExist(token)){
        return _noContentResponse();
    }
    dbDelete(token);

    return c.json({ token: token, ok: true })
});


function _isExist(token){
    const result = dbSearch(token);
    if(result === null){
        return false;
    }
    return true;
}

function _noContentResponse(){
    const res = { ok: false };
    return new Response(JSON.stringify(res), { status: 204 })
}

export { tokenApi }









        