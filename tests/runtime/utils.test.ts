import { describe, expect, it } from "vitest";
import { cn, randomUUID, stripIndents } from "../../src/lib/utils";

describe("cn", () => {
	it("merges utility classes deterministically", () => {
		expect(cn("px-2", "px-4", "text-sm", false && "hidden")).toBe(
			"px-4 text-sm",
		);
	});
});

describe("randomUUID", () => {
	it("returns an RFC4122 v4 style identifier", () => {
		expect(randomUUID()).toMatch(
			/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
		);
	});
});

describe("stripIndents", () => {
	it("normalizes template literal indentation", () => {
		const result = stripIndents`
      line one
        line two
    `;

		expect(result).toBe("line one\nline two");
	});
});
