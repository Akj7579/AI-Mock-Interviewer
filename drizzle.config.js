/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:8cylwb0CBxst@ep-nameless-breeze-a818vrqk.eastus2.azure.neon.tech/AI-Interview-Mocker?sslmode=require",
  },
};
