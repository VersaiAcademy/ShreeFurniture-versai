#!/usr/bin/env python3
"""Add size_urls field to backend Product schema"""

file_path = r'c:\Users\versai\Desktop\ShreeFurniture-versai\backend\models\index.js'

# Read the file
with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Check if size_urls already exists
content = ''.join(lines)
if 'size_urls' in content:
    print("✅ size_urls field already exists in the model")
    exit(0)

# Find the line with 'caring:' and insert after the closing brace
new_lines = []
i = 0
while i < len(lines):
    new_lines.append(lines[i])
    
    # Look for the end of caring block (the closing brace with },)
    if 'caring:' in lines[i]:
        # Skip ahead to find the closing }
        j = i + 1
        while j < len(lines) and '},' not in lines[j]:
            new_lines.append(lines[j])
            j += 1
        
        # Add the closing brace line
        if j < len(lines):
            new_lines.append(lines[j])
            
            # Now insert the size_urls field
            new_lines.append('\n')
            new_lines.append('  // ✅ Size-specific custom URLs for product navigation\n')
            new_lines.append('  size_urls: {\n')
            new_lines.append('    type: Map,\n')
            new_lines.append('    of: String,\n')
            new_lines.append('    default: new Map(),\n')
            new_lines.append('  },\n')
            
            i = j + 1
            continue
    
    i += 1

# Write the updated content
with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("✅ size_urls field added successfully to backend/models/index.js")
