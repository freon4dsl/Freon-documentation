# This script can be used when 'embedme' refuses to embed the correct parts.
# Use it with care, because all markdown files are overwritten.
# Best to commit to git before running this command!!!

# What it does:
# find ../docu-content -type f -name "*.md" → finds all Markdown files under the docu-content directory (recursively).
#For each file ($f):
#Runs 'embedme' in forced mode (--stdout),
#Redirects the rewritten content to a temporary file,
#Moves it back over the original file if successful.

for f in $(find ../docu-content -type f -name "*.md"); do
  npx embedme --source-root ../code-examples --stdout "$f" > "$f.tmp" && mv "$f.tmp" "$f"
done

