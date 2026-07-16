import worker from "../../dist/server/index.js";

const unavailableAssetBinding = {
  fetch: async () => new Response("Not found", { status: 404 }),
};

export default async function handler(request) {
  return worker.fetch(
    request,
    { ASSETS: unavailableAssetBinding },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

export const config = {
  path: "/*",
  preferStatic: true,
};
