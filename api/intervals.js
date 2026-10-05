export default async function handler(req,res){
 res.setHeader('Access-Control-Allow-Origin','*');
 if(req.method==='OPTIONS') return res.status(200).end();
 const apiKey=process.env.INTERVALS_API_KEY;
 const id=req.query.athleteId, ep=req.query.endpoint||'wellness';
 const oldest=req.query.oldest||new Date(Date.now()-90*86400000).toISOString().split('T')[0];
 const newest=req.query.newest||new Date().toISOString().split('T')[0];
 if(!apiKey||!id) return res.status(400).json({error:'key or id'});
 const auth=Buffer.from(`API_KEY:${apiKey}`).toString('base64');
 let url=`https://intervals.icu/api/v1/athlete/${id}`;
 if(ep==='wellness') url+=`/wellness?oldest=${oldest}&newest=${newest}`;
 if(ep==='profile') url=`https://intervals.icu/api/v1/athlete/${id}`;
 if(ep.includes('power')) url+=`/power-curves?oldest=${oldest}&newest=${newest}`;
 try{const r=await fetch(url,{headers:{Authorization:`Basic ${auth}`}}); const t=await r.text(); let d; try{d=JSON.parse(t)}catch{d={raw:t}}; if(!r.ok) return res.status(r.status).json({error:`${r.status}`,data:[STRIPPED] return res.status(200).json(d);}catch(e){return res.status(500).json({error:e.message});}
}
