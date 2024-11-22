import { Application, Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import { users, posts } from "./mockData.js";

const router = new Router();

// GET all users
router.get("/users", (context) => {
  context.response.body = users;
});

// GET a specific user by ID
router.get("/users/:id", (context) => {
  const id = parseInt(context.params.id);
  const user = users.find((u) => u.id === id);
  if (user) {
    context.response.body = user;
  } else {
    context.response.status = 404;
    context.response.body = { error: "User not found" };
  }
});

// GET all posts
router.get("/posts", (context) => {
  context.response.body = posts;
});

// GET posts by user ID
router.get("/users/:id/posts", (context) => {
  const id = parseInt(context.params.id);
  const userPosts = posts.filter((p) => p.userId === id);
  context.response.body = userPosts;
});

const app = new Application();
app.use(oakCors()); 
app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server running on http://localhost:4000");
await app.listen({ port: 4000 });
