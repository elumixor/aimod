const server = Bun.serve({
    port: 8080,
    fetch(req) {
        const url = new URL(req.url);
        if (url.pathname === "/" || url.pathname === "/index.html") {
            return new Response(Bun.file(import.meta.dir + "/index.html"), {
                headers: { "Content-Type": "text/html" },
            });
        }
        return new Response("404 Not Found", { status: 404 });
    },
});

console.log(`Listening on http://localhost:${server.port} ...`);
