import appWorker from "./.output/server/index.mjs";

function normalizeHostname(hostname) {
  if (!hostname) {
    return null;
  }

  const normalized = hostname.trim().toLowerCase().replace(/\.$/, "");
  return normalized || null;
}

function defaultRedirectFromHost(canonicalHostname) {
  if (!canonicalHostname.startsWith("www.")) {
    return null;
  }

  const apexHostname = canonicalHostname.slice(4);
  return apexHostname || null;
}

function redirectToCanonicalHost(request, env) {
  const canonicalHostname = normalizeHostname(env.CANONICAL_HOSTNAME);

  if (!canonicalHostname) {
    return null;
  }

  const configuredRedirectFrom = normalizeHostname(env.REDIRECT_FROM_HOSTNAME);
  const redirectFromHostname =
    configuredRedirectFrom ?? defaultRedirectFromHost(canonicalHostname);

  if (!redirectFromHostname || redirectFromHostname === canonicalHostname) {
    return null;
  }

  const url = new URL(request.url);

  if (url.hostname.toLowerCase() !== redirectFromHostname) {
    return null;
  }

  url.hostname = canonicalHostname;
  return Response.redirect(url.toString(), 308);
}

const workerWrapper = {
  ...appWorker,
  async fetch(request, env, ctx) {
    // Redirect the configured source host to the canonical host before app handling.
    const redirect = redirectToCanonicalHost(request, env);
    if (redirect) {
      return redirect;
    }

    return appWorker.fetch(request, env, ctx);
  },
};

export default workerWrapper;
