# PROMPTS.md

# Product Description AI - Prompt Testing Log

## Overview

This document records the prompt engineering experiments conducted for the Product Description AI application. Different prompt structures were tested to evaluate the quality, clarity, and usefulness of AI-generated product descriptions.

---

# Prompt Variation 1 - Basic Prompt

## Prompt

```
Write a product description for the following product.

Product Name: {product_name}

Features:
{features}
```

### Example Input

**Product Name**
Wireless Bluetooth Headphones

**Features**

- Noise Cancellation
- 40-hour Battery Life
- Bluetooth 5.3
- Comfortable Ear Cushions

### Example Output

> Wireless Bluetooth Headphones provide excellent sound quality with active noise cancellation for an immersive listening experience. Featuring Bluetooth 5.3 connectivity, a 40-hour battery life, and comfortable ear cushions, they are ideal for travel, work, and entertainment.

---

# Prompt Variation 2 - Structured Marketing Prompt

## Prompt

```
You are an expert e-commerce copywriter.

Write a persuasive product description using the following details.

Product Name: {product_name}

Features:
{features}

Requirements:
- Use an engaging tone.
- Highlight customer benefits.
- Keep it under 120 words.
- End with a call to action.
```

### Example Input

**Product Name**
Wireless Bluetooth Headphones

**Features**

- Noise Cancellation
- 40-hour Battery Life
- Bluetooth 5.3
- Comfortable Ear Cushions

### Example Output

> Experience premium sound with Wireless Bluetooth Headphones. Enjoy crystal-clear audio, powerful noise cancellation, and seamless Bluetooth 5.3 connectivity. With an impressive 40-hour battery life and ultra-soft ear cushions, they're designed for all-day comfort whether you're working, traveling, or relaxing. Upgrade your listening experience today and enjoy music without limits!

---

# Prompt Variation 3 - SEO Optimized Prompt

## Prompt

```
You are an SEO specialist and professional product copywriter.

Generate an SEO-friendly product description.

Product Name: {product_name}

Features:
{features}

Requirements:
- Include the product name naturally.
- Mention important features.
- Focus on customer benefits.
- Use simple and engaging language.
- Keep it between 100–150 words.
- Include relevant keywords naturally.
- End with a strong call to action.
```

### Example Input

**Product Name**
Wireless Bluetooth Headphones

**Features**

- Noise Cancellation
- 40-hour Battery Life
- Bluetooth 5.3
- Comfortable Ear Cushions

### Example Output

> Wireless Bluetooth Headphones deliver high-quality sound with advanced noise cancellation, making every listening session immersive and distraction-free. Equipped with Bluetooth 5.3 technology, they provide a fast and stable wireless connection. The long-lasting 40-hour battery keeps your music playing throughout the day, while soft ear cushions ensure exceptional comfort during extended use. Whether you're commuting, working, gaming, or exercising, these wireless headphones are built to enhance your experience. Upgrade your audio today with Wireless Bluetooth Headphones and enjoy premium performance wherever you go.

---

# Best Prompt

Prompt Variation 3 produced the highest-quality results. It consistently generated well-structured, engaging, and SEO-friendly descriptions while naturally incorporating important product keywords. The output balanced technical features with customer benefits, making it suitable for e-commerce platforms. The clear formatting and call-to-action also improved readability and overall marketing effectiveness.

---

# System Prompt / Role Used

```
You are an expert e-commerce copywriter and SEO specialist. Generate clear, engaging, and persuasive product descriptions that highlight customer benefits, naturally include important keywords, and encourage users to purchase the product.
```

---

# Conclusion

Among the three prompt variations, the SEO-optimized prompt produced the most consistent and professional outputs. It generated descriptions that were informative, persuasive, easy to read, and suitable for online marketplaces while maintaining good keyword placement and a natural writing style.
