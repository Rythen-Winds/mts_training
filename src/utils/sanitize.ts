export default function sanitize(userInput: string): string {
  return userInput.replace(/[^a-zA-Z0-9!@#$%^&*()-_=+,.?;:]/g, '');
  //* ^ inside the square brackets [] indicates negation, meaning we want to match any characters not listed.
  //* a-zA-Z0-9 matches any alphanumeric character (both uppercase and lowercase letters, and digits).
  //* !@#$%^&*()-_=+,.?;: matches specific special characters that are commonly allowed in passwords.
  //* All other characters that are not in this whitelist will be replaced with an empty string, effectively removing them from the input.
}
