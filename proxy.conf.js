const proxyConfig = [
    {
    context: "/api",
    target: "http://localhost:44331",
    pathRewrite: { '^/api':'' }
    }
    ];
    Module.exports = proxyConfig;

    