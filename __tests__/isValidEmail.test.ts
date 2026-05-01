import { isValidEmail } from "@/lib/validation/isValidEmail";

describe("isValidEmail", () => {
  it("aceita e-mails comuns", () => {
    expect(isValidEmail("edsonjunior.narvaes@gmail.com")).toBe(true);
    expect(isValidEmail("  user@example.co.uk  ")).toBe(true);
    expect(isValidEmail("a@bc.co")).toBe(true);
  });

  it("rejeita formatos inválidos", () => {
    expect(isValidEmail("")).toBe(false);
    expect(isValidEmail("   ")).toBe(false);
    expect(isValidEmail("semarroba")).toBe(false);
    expect(isValidEmail("@nodomain.com")).toBe(false);
    expect(isValidEmail("no@domain")).toBe(false);
    expect(isValidEmail("no@domain.c")).toBe(false);
    expect(isValidEmail("spaces in@mail.com")).toBe(false);
  });
});
