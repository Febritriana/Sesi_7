import assert from "assert";

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
"x-api-key": "reqres-free-v1",
"Content-Type": "application/json",

},

body: JSON.stringify({
name: "shinta",
job: "leader",

}),
});

const data = await response.json();
//console.log(data);
assert.strictEqual(response.status, 201);
assert.strictEqual(data.name,"shinta");

});

it("Patch Reqres", async function () {
    const response = await fetch("https://reqres.in/api/users/2", {
      method: "PATCH",
      headers: {
        "x-api-key": "reqres-free-v1",
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
  });

  it("Delete Reqres", async function () {
    const response = await fetch("https://reqres.in/api/users/2", {
      method: "DELETE",
      headers:{
        "x-api-key": "reqres-free-v1",
        "Content-Type": "application/json",
      }
    });

    assert.strictEqual(response.status, 204); 
  });
});




