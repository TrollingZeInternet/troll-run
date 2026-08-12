import fs from "node:fs";
import path from "node:path";

const targets = [
  path.join(
    "node_modules",
    "@relayprotocol",
    "relay-kit-ui",
    "_esm",
    "src",
    "components",
    "widgets",
    "SwapWidgetRenderer.js",
  ),
  path.join(
    "node_modules",
    "@relayprotocol",
    "relay-kit-ui",
    "_cjs",
    "src",
    "components",
    "widgets",
    "SwapWidgetRenderer.js",
  ),
];

const original = `amount: tradeType === 'EXACT_INPUT'
                ? parseUnits(debouncedInputAmountValue, fromToken.decimals).toString()
                : parseUnits(debouncedOutputAmountValue, toToken.decimals).toString(),`;

const patched = `amount: tradeType === 'EXACT_INPUT'
                ? (debouncedInputAmountValue && debouncedInputAmountValue.trim().length > 0
                    ? parseUnits(debouncedInputAmountValue, fromToken.decimals).toString()
                    : '0')
                : (debouncedOutputAmountValue && debouncedOutputAmountValue.trim().length > 0
                    ? parseUnits(debouncedOutputAmountValue, toToken.decimals).toString()
                    : '0'),`;

for (const target of targets) {
  if (!fs.existsSync(target)) {
    continue;
  }

  const content = fs.readFileSync(target, "utf8");

  if (content.includes(patched)) {
    console.log(`Already patched: ${target}`);
    continue;
  }

  if (!content.includes(original)) {
    console.warn(`Patch target not found: ${target}`);
    continue;
  }

  fs.writeFileSync(target, content.replace(original, patched));
  console.log(`Patched: ${target}`);
}
