
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const apiKey = process.env.INTERVALS_API_KEY;
  const athleteId = req.query.athleteId;
  const endpoint = req.query.endpoint || 'wellness';

  if (!apiKey) return res.status(500).json({ error: 'INTERVALS_API_KEY 환경변수 없음. Vercel Settings > Environment Variables 추가 후 Redeploy' });
  if (!athleteId) return res.status(400).json({ error: 'athleteId 필요' });

  const auth = Buffer.from(`API_KEY:${apiKey}`).toString('base64');

  let url = '';
  if (endpoint === 'profile' || endpoint === '') {
    url = `https://intervals.icu/api/v1/athlete/${athleteId}`;
  } else if (endpoint === 'wellness') {
    const oldest = new Date(Date.now()-30*24*3600*1000).toISOString().split('T')[0];
    url = `https://intervals.icu/api/v1/athlete/${athleteId}/wellness?oldest=${oldest}`;
  } else if (endpoint === 'events') {
    url = `https://intervals.icu/api/v1/athlete/${athleteId}/events`;
  } else if (endpoint === 'activities') {
    url = `https://intervals.icu/api/v1/athlete/${athleteId}/activities?oldest=2024-01-01`;
  } else {
    url = `https://intervals.icu/api/v1/athlete/${athleteId}/${endpoint}`;
  }

  try {
    const fetchOpts = {
      method: req.method,
      headers: { 'Authorization': `Basic ${auth}`, 'Content-Type': 'application/json' }
    };
    if (req.method === 'POST' && req.body) {
      fetchOpts.body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    }
    const r = await fetch(url, fetchOpts);
    if (!r.ok) {
      const text = await r.text();
      if (r.status === 403) {
        return res.status(403).json({ error: `403 접근 거부: Athlete ${athleteId} 코치/팔로우 승인 필요. 원본: ${text}` });
      }
      return res.status(r.status).json({ error: text });
    }
    const data = await r.json().catch(async () => ({ ok: true }));
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
