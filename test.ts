import { listenAndServe } from "https://deno.land/std/http/mod.ts";

listenAndServe({ port: 3000 }, async (req) => {
  if (req.method === "GET" && req.url === "/") {
    const file = await Deno.open("./index.html");
    req
      .respond({
        status: 200,
        body: file,
      })
      .then(() => Deno.close(file.rid)); // openしたのをclose(適切な方法かどうかは不明)
  } else if (req.method === "GET" && req.url === "/bye") {
    req.respond({
      status: 200,
      body: "Bye World.",
    });
  } else {
    req.respond({
      status: 404,
      body: "not found",
    });
  }
});
