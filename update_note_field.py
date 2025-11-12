#!/usr/bin/env python3
import os

filepath = r'c:\Users\versai\Desktop\ShreeFurniture-versai\admin\src\components\Products.jsx'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

old_note = '''              <div className="form-group">
                <label>General Note (e.g., Materials used)</label>
                <textarea name="note" value={formData.note} onChange={handleInputChange} rows="2" placeholder="If a board is required, we use MDF instead of plywood" />
              </div>'''

new_note = '''              <div className="form-group">
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}>
                  <label>General Note {showNote ? '' : '(Optional)'}</label>
                  <button type="button" onClick={() => setShowNote(!showNote)} style={{padding: '4px 8px', fontSize: '12px', background: '#E5E7EB', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '500'}}>
                    {showNote ? '✕ Remove' : '+ Add'}
                  </button>
                </div>
                {showNote && (
                  <textarea name="note" value={formData.note} onChange={handleInputChange} rows="2" placeholder="If a board is required, we use MDF instead of plywood" />
                )}
              </div>'''

if old_note in content:
    content = content.replace(old_note, new_note)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print('✓ Note field updated with toggle button')
else:
    print('✗ Could not find note field to update')
    print(f'File length: {len(content)} characters')
