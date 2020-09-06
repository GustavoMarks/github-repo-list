const request = require('supertest');
const app = require('../../src/app');

function generateRandomUsername() {
  // username deve conter até 39 caracteres alphanuméricos
  // não pode começar ou terminar com hífen, não pode ter hífen consecutivo
  const length = Math.floor(Math.random() * 39);
  const characteres = 'aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVxXwWyYzZ0123456789-'

  let username = characteres[Math.floor(Math.random() * 62)]
  for (i = 1; i < length - 1; i++) {
    const nextCharacter = characteres[Math.floor(Math.random() * 63)];
    if (nextCharacter != '-' || username[i - 1] != '-') username += nextCharacter;
  }

  username += characteres[Math.floor(Math.random() * 62)];
  return username;
}

describe("Resquest to GitHub API", () => {
  it("Should get repositorys of an username", async () => {
    const username = generateRandomUsername();

    const response = await request(app).get(`/github-repos/${username}`);
    expect(String(response.status)).toMatch(/^200|202|404$/);
  })
})