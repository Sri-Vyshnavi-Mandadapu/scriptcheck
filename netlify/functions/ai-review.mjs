import{review,validateInput,fallback}from'../../server/ai-review.js';
const json=(body,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
export default async function handler(request){
 const env=process.env;
 if(request.method==='GET')return json({configured:!!env.OPENAI_API_KEY,provider:'OpenAI',model:env.OPENAI_MODEL||'gpt-5.4'});
 if(request.method!=='POST')return json({error:'Method not allowed'},405);
 const origin=request.headers.get('origin');
 if(origin&&origin!==new URL(request.url).origin)return json({error:'Origin not allowed'},403);
 if(!request.headers.get('content-type')?.startsWith('application/json'))return json(fallback('Use a JSON prescription request.'),415);
 if(Number(request.headers.get('content-length')||0)>4500000)return json(fallback('File too large. Ask a pharmacist or use a smaller document.'),413);
 let body;
 try{const raw=await request.text();if(raw.length>4500000)return json(fallback('File too large.'),413);body=validateInput(JSON.parse(raw));}
 catch(error){return json(fallback(error instanceof SyntaxError?'Invalid request.':error.message),400);}
 return json(await review(body,{apiKey:env.OPENAI_API_KEY,model:env.OPENAI_MODEL||'gpt-5.4'}));
}
export const config={rateLimit:{windowLimit:6,windowSize:60,aggregateBy:['ip','domain']}};
