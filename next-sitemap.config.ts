/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.ghorabaa.com", // your main URL
  generateRobotsTxt: true, // generates robots.txt
  sitemapSize: 5000, // optional, split if you have many pages
  changefreq: "daily", // optional, default 'weekly'
  priority: 0.7, // default priority
  exclude: ["/signin", "/signup", "/addStory", "/admin/*"], // exclude sensitive pages
};
