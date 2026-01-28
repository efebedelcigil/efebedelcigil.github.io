//this is the cloudflare worker's code that handles the email verification requests
//the code uses Verifalia's API to validate email addresses
//keeping SID and TOKEN securely in secret variables on cloudflare workers so they are not exposed to the client side on github pages

export default {
  async fetch(request, env) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "https://efebedelcigil.github.io", 
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // 1. Tarayıcıdan doğrudan linke tıklarsan (GET) çalışıp çalışmadığını gösterir
    if (request.method === "GET") {
      return new Response("E-mail Validation Worker is running!", { status: 200, headers: { "Content-Type": "text/plain" } });
    }

    // 2. Preflight isteği (Tarayıcı güvenliği için)
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // 3. Form gönderildiğinde (POST) esas işi yapar
    if (request.method === "POST") {
      try {
        const { email } = await request.json();
        const auth = btoa(`${env.VERIFALIA_SID}:${env.VERIFALIA_TOKEN}`);
        
        const response = await fetch(`https://api.verifalia.com/v2.4/email-validations/single?email=${encodeURIComponent(email)}`, {
          method: "GET",
          headers: {
            "Authorization": `Basic ${auth}`,
            "Accept": "application/json"
          }
        });

        const data = await response.json();
        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: "Service Error" }), { status: 500, headers: corsHeaders });
      }
    }
    return new Response("Method Not Allowed", { status: 405, headers: corsHeaders });
  }
};
