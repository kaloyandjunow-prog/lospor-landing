import { createHash, createPublicKey } from "node:crypto";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

/**
 * The files lospor.org publishes for a LOSPOR Hospital first installation.
 *
 * The bootstrap is copied verbatim from lospor-hospital. The fingerprint and
 * checksum are derived from that copy at build time rather than kept as
 * separate files, so the published fingerprint can never disagree with the key
 * the published script actually carries.
 */
export async function installFiles() {
  const script = await readFile(join(root, "install", "losporctl-install.sh"));
  const embedded = script.toString("utf8").match(/LOSPOR_RELEASE_SIGNING_PUBLIC_KEY='(-----BEGIN PUBLIC KEY-----[\s\S]+?-----END PUBLIC KEY-----)'/);
  if (!embedded) throw new Error("install/losporctl-install.sh does not carry a release signing key");
  const der = createPublicKey(embedded[1]).export({ type: "spki", format: "der" });
  const fingerprint = `SHA256:${createHash("sha256").update(der).digest("base64").replace(/=+$/, "")}`;
  const scriptSha256 = createHash("sha256").update(script).digest("hex");
  return {
    fingerprint,
    files: [
      { path: "install/losporctl-install.sh", contents: script },
      { path: "install/losporctl-install.sh.sha256", contents: `${scriptSha256}  losporctl-install.sh\n` },
      { path: ".well-known/lospor-release-key.txt", contents: `${fingerprint}\n` },
    ],
  };
}
