# 📋 META XML FEED SPECIFICATION - EXACT FORMAT

**Date**: January 21, 2026  
**Status**: ✅ Finalized & Compliant  
**Goal**: ZERO warnings in Meta Commerce Manager

---

## 🎯 RSS 2.0 WITH META NAMESPACE

### Correct XML Declaration

```xml
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
```

**Key Points**:
- ✅ Version: `1.0` (not 1.1)
- ✅ Encoding: `UTF-8`
- ✅ RSS Version: `2.0`
- ✅ Namespace: `xmlns:g="http://base.google.com/ns/1.0"` (Meta-approved)

**❌ WRONG NAMESPACE**:
```xml
xmlns:g="http://base.google.com/feeds/gs"  ← OLD, causes errors
xmlns:g="http://schemas.google.com/..."     ← Wrong namespace
```

---

## 📦 CHANNEL STRUCTURE

```xml
<channel>
  <title>Store Name - Product Catalog</title>
  <link>https://example.com</link>
  <description>Store description</description>
  <lastBuildDate>2026-01-21T10:30:00.000Z</lastBuildDate>
  
  <!-- Products go here -->
  <item>...</item>
  <item>...</item>
</channel>
```

**Channel Fields**:
- `title` - Store/catalog name
- `link` - Store homepage URL
- `description` - Brief store description
- `lastBuildDate` - ISO 8601 format timestamp

---

## 🛍️ PRODUCT ITEM STRUCTURE

### EXACT Required Format

```xml
<item>
  <g:id>507f1f77bcf86cd799439011</g:id>
  <title>Product Name Here</title>
  <description>Full product description text</description>
  <link>https://example.com/product/507f1f77bcf86cd799439011</link>
  <g:image_link>https://example.com/image.jpg</g:image_link>
  <g:price>999.00 INR</g:price>
  <g:availability>in stock</g:availability>
  <g:brand>Brand Name</g:brand>
  <g:condition>new</g:condition>
</item>
```

---

## 🔍 FIELD-BY-FIELD SPECIFICATIONS

### 1. `<g:id>` - Product Identifier

```xml
<g:id>507f1f77bcf86cd799439011</g:id>
```

**Requirements**:
- ✅ Unique identifier per product
- ✅ Can be: SKU, MongoDB ID, product ID
- ✅ Must be XML-safe (escape: `<>\"'&`)
- ✅ Max length: 255 characters
- ✅ Must match catalog product ID

**❌ Wrong**:
```xml
<g:id></g:id>                    <!-- Empty -->
<g:id>Product Name</g:id>        <!-- Not unique -->
<g:id>prod & co</g:id>           <!-- Bare & -->
```

**✅ Correct**:
```xml
<g:id>507f1f77bcf86cd799439011</g:id>
<g:id>SKU-12345</g:id>
<g:id>prod &amp; co</g:id>        <!-- Escaped & -->
```

---

### 2. `<title>` - Product Name

```xml
<title>Premium Wooden Sofa - Modern Design</title>
```

**Requirements**:
- ✅ Required field (Meta error if missing)
- ✅ Product name/title
- ✅ Max length: 150 characters
- ✅ Must not be empty
- ✅ No HTML tags
- ✅ Proper XML escaping

**❌ Wrong**:
```xml
<title></title>                              <!-- Empty -->
<title>Sofa &amp; Chair</title>               <!-- Wrong: use & not &amp; here -->
<title><b>Wooden Sofa</b></title>            <!-- HTML tags -->
<title>Product</title>                       <!-- Too generic -->
```

**✅ Correct**:
```xml
<title>Premium Wooden Sofa - Modern Design</title>
<title>Wooden Dining Table with 6 Chairs</title>
<title>Carved Wooden Bed Frame - Queen Size</title>
```

---

### 3. `<description>` - Product Details

```xml
<description>Premium wooden sofa crafted from high-quality hardwood with contemporary design. Features comfortable seating for 3-4 people with high-quality upholstery.</description>
```

**Requirements**:
- ✅ Required field (Meta error if missing)
- ✅ Detailed product description
- ✅ Max length: 5000 characters
- ✅ Must not be empty
- ✅ No HTML tags
- ✅ Proper XML escaping

**Content Tips**:
- Include key features
- Mention materials and dimensions
- Highlight unique selling points
- Keep language clear and descriptive

**❌ Wrong**:
```xml
<description></description>                  <!-- Empty -->
<description>Sofa</description>              <!-- Too short -->
<description><p>Sofa</p></description>       <!-- HTML tags -->
```

**✅ Correct**:
```xml
<description>Premium wooden sofa crafted from high-quality hardwood with contemporary design. Features comfortable seating for 3-4 people with high-quality upholstery and durable construction. Perfect for living rooms and modern homes.</description>
```

---

### 4. `<link>` - Product URL

```xml
<link>https://srifurniturevillage.com/DetaileProduct/507f1f77bcf86cd799439011</link>
```

**Requirements**:
- ✅ Required field
- ✅ Absolute URL (must start with `https://` or `http://`)
- ✅ Must be publicly accessible
- ✅ Must link to product page
- ✅ Max length: 2048 characters

**❌ Wrong**:
```xml
<link>product/123</link>                     <!-- Relative URL -->
<link>/DetaileProduct/123</link>             <!-- Relative URL -->
<link>example.com/product</link>             <!-- Missing protocol -->
<link></link>                                <!-- Empty -->
```

**✅ Correct**:
```xml
<link>https://srifurniturevillage.com/DetaileProduct/507f1f77bcf86cd799439011</link>
<link>https://example.com/products/sofa</link>
```

---

### 5. `<g:image_link>` - Product Image

```xml
<g:image_link>https://srifurniturevillage.com/uploads/products/sofa-brown-01.jpg</g:image_link>
```

**Requirements**:
- ✅ Required field (Meta error if missing)
- ✅ Absolute URL (must start with `https://` or `http://`)
- ✅ Must be publicly accessible
- ✅ Actual product image (no placeholder)
- ✅ Supported formats: JPG, PNG, GIF, WEBP
- ✅ Max length: 2048 characters

**❌ Wrong**:
```xml
<g:image_link>/uploads/image.jpg</g:image_link>           <!-- Relative URL -->
<g:image_link>image.jpg</g:image_link>                    <!-- Relative URL -->
<g:image_link>https://example.com/placeholder.jpg</g:image_link> <!-- Placeholder -->
<g:image_link></g:image_link>                             <!-- Empty -->
<g:image_link>/default-product.jpg</g:image_link>        <!-- Default/placeholder -->
```

**✅ Correct**:
```xml
<g:image_link>https://srifurniturevillage.com/uploads/products/sofa-brown-01.jpg</g:image_link>
<g:image_link>https://cdn.example.com/product/123/image.png</g:image_link>
<g:image_link>https://example.com/images/furniture/sofa.webp</g:image_link>
```

---

### 6. `<g:price>` - Product Price

```xml
<g:price>22500.00 INR</g:price>
```

**Requirements**:
- ✅ Required field (Meta error if missing)
- ✅ Format: `NUMBER.DECIMAL CURRENCY`
- ✅ Always include `.00` decimal
- ✅ Currency in English (INR, USD, etc.)
- ✅ Space between number and currency

**Formatting Rules**:
- Whole numbers: `999.00 INR` (not `999 INR`)
- Decimals: `999.99 INR` (not `999.9 INR`)
- Always 2 decimal places: `.00`, `.50`, `.99`

**❌ Wrong**:
```xml
<g:price>999 INR</g:price>                   <!-- No decimal -->
<g:price>999.5 INR</g:price>                 <!-- Only 1 decimal -->
<g:price>999.00</g:price>                    <!-- Missing currency -->
<g:price>999,00 INR</g:price>                <!-- Wrong decimal separator -->
<g:price>INR 999.00</g:price>                <!-- Currency first -->
<g:price></g:price>                          <!-- Empty -->
```

**✅ Correct**:
```xml
<g:price>22500.00 INR</g:price>
<g:price>999.99 INR</g:price>
<g:price>150.50 INR</g:price>
<g:price>5000.00 INR</g:price>
```

---

### 7. `<g:availability>` - Stock Status

```xml
<g:availability>in stock</g:availability>
```

**Requirements**:
- ✅ Required field (Meta error if missing)
- ✅ ONLY two allowed values:
  - `in stock` (lowercase)
  - `out of stock` (lowercase)
- ✅ Case-sensitive
- ✅ No other values allowed

**❌ Wrong**:
```xml
<g:availability>In Stock</g:availability>           <!-- Wrong case -->
<g:availability>available</g:availability>          <!-- Wrong value -->
<g:availability>yes</g:availability>                <!-- Wrong value -->
<g:availability>true</g:availability>               <!-- Wrong value -->
<g:availability></g:availability>                   <!-- Empty -->
<g:availability>Out Of Stock</g:availability>       <!-- Wrong case -->
```

**✅ Correct**:
```xml
<g:availability>in stock</g:availability>
<g:availability>out of stock</g:availability>
```

---

### 8. `<g:brand>` - Brand Name

```xml
<g:brand>Sri Furniture Village</g:brand>
```

**Requirements**:
- ✅ Required by Meta for commerce
- ✅ Brand/manufacturer name
- ✅ Max length: 100 characters
- ✅ Must not be empty
- ✅ Proper XML escaping

**❌ Wrong**:
```xml
<g:brand></g:brand>                          <!-- Empty -->
<g:brand>Brand & Co</g:brand>                <!-- Bare & -->
```

**✅ Correct**:
```xml
<g:brand>Sri Furniture Village</g:brand>
<g:brand>Premium Furniture Co</g:brand>
<g:brand>Brand &amp; Co</g:brand>             <!-- If & needed, escape it -->
```

---

### 9. `<g:condition>` - Product Condition

```xml
<g:condition>new</g:condition>
```

**Requirements**:
- ✅ Required field
- ✅ Allowed values: `new`, `refurbished`, `used`
- ✅ Case-sensitive (lowercase)
- ✅ Only one value per item

**❌ Wrong**:
```xml
<g:condition>New</g:condition>               <!-- Wrong case -->
<g:condition>pristine</g:condition>          <!-- Wrong value -->
<g:condition></g:condition>                  <!-- Empty -->
```

**✅ Correct**:
```xml
<g:condition>new</g:condition>
<g:condition>refurbished</g:condition>
<g:condition>used</g:condition>
```

---

## 🔐 XML ESCAPING RULES

All text fields must properly escape special characters:

| Character | Escaped Form | When to Use |
|-----------|------------|------------|
| `&` | `&amp;` | Always escape bare ampersands |
| `<` | `&lt;` | In text content |
| `>` | `&gt;` | In text content |
| `"` | `&quot;` | In attribute values |
| `'` | `&apos;` | In attribute values |

**Examples**:

```xml
<!-- ❌ Wrong - bare ampersand -->
<title>Sofa & Chair</title>

<!-- ✅ Correct -->
<title>Sofa &amp; Chair</title>

<!-- ❌ Wrong - unescaped < > -->
<description>Price < 1000 & > 500</description>

<!-- ✅ Correct -->
<description>Price &lt; 1000 &amp; &gt; 500</description>
```

---

## 📊 COMPLETE VALID EXAMPLE

```xml
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Sri Furniture Village - Product Catalog</title>
    <link>https://srifurniturevillage.com</link>
    <description>Premium Wooden Furniture Products</description>
    <lastBuildDate>2026-01-21T10:30:00.000Z</lastBuildDate>
    
    <item>
      <g:id>507f1f77bcf86cd799439011</g:id>
      <title>Premium Wooden Sofa - Modern Design</title>
      <description>Elegant wooden sofa crafted from premium hardwood with contemporary design. Features comfortable seating for 3-4 people with high-quality upholstery and durable construction. Perfect for living rooms.</description>
      <link>https://srifurniturevillage.com/DetaileProduct/507f1f77bcf86cd799439011</link>
      <g:image_link>https://srifurniturevillage.com/uploads/products/sofa-brown-01.jpg</g:image_link>
      <g:price>22500.00 INR</g:price>
      <g:availability>in stock</g:availability>
      <g:brand>Sri Furniture Village</g:brand>
      <g:condition>new</g:condition>
    </item>
    
    <item>
      <g:id>507f1f77bcf86cd799439012</g:id>
      <title>Wooden Dining Table with 6 Chairs</title>
      <description>Complete dining set with solid wood dining table and 6 matching chairs. Ideal for family meals and gatherings. Sturdy construction ensures long-lasting durability and classic aesthetic appeal.</description>
      <link>https://srifurniturevillage.com/DetaileProduct/507f1f77bcf86cd799439012</link>
      <g:image_link>https://srifurniturevillage.com/uploads/products/dining-set-natural-01.jpg</g:image_link>
      <g:price>18999.00 INR</g:price>
      <g:availability>in stock</g:availability>
      <g:brand>Sri Furniture Village</g:brand>
      <g:condition>new</g:condition>
    </item>
  </channel>
</rss>
```

---

## ✅ VALIDATION CHECKLIST

Before uploading to Meta, verify:

- [ ] XML declaration: `<?xml version="1.0" encoding="UTF-8"?>`
- [ ] RSS version: `version="2.0"`
- [ ] Namespace: `xmlns:g="http://base.google.com/ns/1.0"` (NOT other namespaces)
- [ ] Every `<item>` has all 9 required fields
- [ ] `g:id` - Unique and XML-safe
- [ ] `title` - 1-150 characters, no HTML
- [ ] `description` - 1-5000 characters, no HTML
- [ ] `link` - Absolute URL, starts with https://
- [ ] `g:image_link` - Absolute URL, actual image (not placeholder)
- [ ] `g:price` - Format "NUMBER.00 CURRENCY"
- [ ] `g:availability` - Only "in stock" or "out of stock"
- [ ] `g:brand` - Not empty, max 100 chars
- [ ] `g:condition` - Only "new", "refurbished", or "used"
- [ ] All special XML characters escaped
- [ ] No duplicate product IDs
- [ ] File is valid XML (no syntax errors)

---

**Status**: ✅ Complete Specification  
**Compliance**: Meta-Approved Format  
**Ready**: Production Deployment

