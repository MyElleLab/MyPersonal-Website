/**
 * Structured data.
 *
 * The `</script>` escape is not optional. JSON.stringify happily emits the
 * literal characters `</script>` if any string field contains them, and the
 * HTML parser ends the script tag at that point, dumping the rest of the JSON
 * into the document as text. Replacing the `<` with `<` is valid JSON,
 * parses identically, and cannot close the tag.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
