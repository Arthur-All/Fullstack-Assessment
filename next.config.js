// next.config.js
module.exports = {
  async headers() {
    return [
      {
        // Apply CORS headers to all API routes
        source: "/api/v1/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "http://localhost:4200",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Origin, X-Requested-With, Content-Type, Accept",
          },
        ],
      },
    ];
  },
};
