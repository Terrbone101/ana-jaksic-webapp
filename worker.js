// Maps the visitor's country (Cloudflare edge geolocation) to a supported
// UI language. Everything not listed falls back to English.
const COUNTRY_LANG = {
  RS: "sr", // Serbia
  ME: "sr", // Montenegro
  BA: "sr", // Bosnia and Herzegovina
  HR: "hr", // Croatia
  DE: "de", // Germany
  AT: "de", // Austria
  CH: "de", // Switzerland
  LI: "de", // Liechtenstein
  FR: "fr", // France
  BE: "fr", // Belgium
  LU: "fr", // Luxembourg
  MC: "fr", // Monaco
};

export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);

    const accept = request.headers.get("Accept") || "";
    if (!accept.includes("text/html")) return response;
    if (request.headers.get("Cookie")?.includes("i18next=")) return response;

    const lang = COUNTRY_LANG[request.cf?.country] || "en";
    const withLang = new Response(response.body, response);
    withLang.headers.append("Set-Cookie", `i18next=${lang}; Path=/; SameSite=Lax`);
    return withLang;
  },
};
