import assert from "assert";
import Ajv from "ajv";

const ajv = new Ajv();

describe("Reqres", function () {
  it("Get List", async function () {
    const response = await fetch("https://reqres.in/api/users?page=2");
    const data = await response.json();
    assert.strictEqual(response.status, 200);
  });

  it("Post Reqres", async function () {
    const response = await fetch("https://reqres.in/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "shinta",
        job: "leader",
      }),
    });

    const data = await response.json();
    assert.strictEqual(response.status, 201);
    assert.strictEqual(data.name, "shinta");

    const postSchema = {
      type: "object",
      required: ["name", "job", "id", "createdAt"],
      properties: {
        name: { type: "string" },
        job: { type: "string" },
        id: { type: "string" },
        createdAt: { type: "string", format: "date-time" }
      }
    };

    const validate = ajv.compile(postSchema);
    const valid = validate(data);
    assert.strictEqual(valid, true, "POST response schema tidak valid: " + JSON.stringify(validate.errors));
  });

  it("Patch Reqres", async function () {
    const response = await fetch("https://reqres.in/api/users/2", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "shinta",
        job: "manager",
      }),
    });

    const data = await response.json();
    assert.strictEqual(response.status, 200);
    assert.strictEqual(data.job, "manager");

    // JSON Schema Validation untuk PATCH
    const patchSchema = {
      type: "object",
      required: ["name", "job", "updatedAt"],
      properties: {
        name: { type: "string" },
        job: { type: "string" },
        updatedAt: { type: "string", format: "date-time" }
      }
    };

    const validate = ajv.compile(patchSchema);
    const valid = validate(data);
    assert.strictEqual(valid, true, "PATCH response schema tidak valid: " + JSON.stringify(validate.errors));
  });

  it("Delete Reqres", async function () {
    const response = await fetch("https://reqres.in/api/users/2", {
      method: "DELETE",
    });

    assert.strictEqual(response.status, 204); // No Content
  });
});