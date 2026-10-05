export default async function handler(req,res){
 res.setHeader('Access-Control-Allow-Origin','*');
 res.setHeader('Access-Control-Allow-Methods','GET,OPTIONS');
 res.setHeader('Access-Control-Allow-Headers','Content-Type');
 if(req.method==='OPTIONS') return res.status(200).end();
 const apiKey=process.env.INTERVALS_API_KEY;
 const athleteId=req.query.athleteId;
 const endpoint=req.query.endpoint||'wellness';
 const oldest=req.query.oldest||new Date(Date.now()-90*86400000).toISOString().split('T')[0];
 const newest=req.query.newest||new Date().toISOString().split('T')[0];
 if(!apiKey) return res.status(500).json({error:'KEY 없음'});
 if(!athleteId) return res.status(400).json({error:'athleteId 필요'});
 const auth=Buffer.from(`API_KEY:${apiKey}`).toString('base64');
 let url=`https://intervals.icu/api/v1/athlete/${athleteId}`;
 if(endpoint==='wellness') url+=`/wellness?oldest=${oldest}&newest=${newest}`;
 if(endpoint==='profile') url=`https://intervals.icu/api/v1/athlete/${athleteId}`;
 if(endpoint==='power-curves'||endpoint==='power-curve') url+=`/power-curves?oldest=${oldest}&newest=${newest}`;
 if(endpoint==='activities') url+=`/activities?oldest=${oldest}T00:00:00&newest=${newest}T23:59:59`;
 if(endpoint==='events') url+=`/events?oldest=${oldest}&newest=${newest}`;
 try{
  const r=await fetch(url,{headers:{Authorization:`Basic ${auth}`}});
  const txt=await r.text(); let data; try{data=JSON.parse(txt)}catch{data={raw:txt}};
  if(!r.ok) return res.status(r.status).json({error:`${r.status} 승인 필요`,status:r.status,data});
  return res.status(200).json(data);
 }catch(e){return res.status(500).json({error:e.message});}
}
