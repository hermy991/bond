export async function encryptGenerator(params: { algorithm?: AlgorithmIdentifier; message?: string | number } = {}) {
  const { algorithm, message } = { ...{ algorithm: "SHA-256", message: "" }, ...params };
  const msgUint8 = new TextEncoder().encode(message + "");
  const hashBuffer = await crypto.subtle.digest(algorithm, msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return hashHex;
}
