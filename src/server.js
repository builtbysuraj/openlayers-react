import { createServer } from "miragejs";

createServer({
  routes() {
    this.passthrough(
      "https://raw.githubusercontent.com/Subhash9325/GeoJson-Data-of-Indian-States/master/Indian_States"
    );
    this.passthrough(
      "https://raw.githubusercontent.com/geohacker/india/master/district/india_district.geojson"
    );

    this.post("/login", (schema, request) => {
      const { username, password } = JSON.parse(request.requestBody);
      if (username === "admin" && password === "admin") {
        return { role: "Admin" };
      } else if (username === "viewer" && password === "viewer") {
        return { role: "Viewer" };
      } else {
        return new Response(401, {}, { error: "Invalid credentials" });
      }
    });

    this.get("/users", () => {
      return [
        { id: 1, name: "John Doe", email: "john@example.com" },
        { id: 2, name: "Jack", email: "jack@example.com" },
      ];
    });
  },
});
