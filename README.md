# Per Scholas Demo Robot - AI-Powered E-commerce Copywriting Assistant

## Overview

Per Scholas Demo Robot is a full-stack web application designed to help e-commerce store owners generate high-quality marketing copy quickly and efficiently using AI. It leverages the power of OpenAI's language models to create product descriptions, SEO metadata, ad copy, social media captions, and more, tailored to the user's brand and product information.

**Why?** Crafting compelling copy is crucial for e-commerce success but can be time-consuming and require specific expertise. This tool aims to automate and simplify the process, saving users time, improving conversion rates through better descriptions and SEO, and providing consistent brand messaging.

## Features

*   **User Authentication:** Secure login and registration using Auth0.
*   **Store Profile:** Users can save their store name and brand information for tailored copy generation.
*   **Single Product Description Generation:**
    *   Generate unique product descriptions based on name, category, details, colors, etc.
    *   Optionally include a bulleted list of benefits with emojis.
    *   Generate optimized SEO title tags.
    *   Generate optimized SEO meta descriptions.
    *   Supports multiple languages (defined in user settings).
*   **Bulk Product Description Generation:** Upload product details (likely via CSV import, although the upload mechanism isn't fully shown in the provided code) and generate descriptions, SEO titles, and meta descriptions for multiple products asynchronously. Results are saved and downloadable.
*   **Ad Copy Generation:** Create platform-specific (e.g., Facebook, Google) ad copy based on problem, solution, product details, and target audience.
*   **Product Name Generation:** Suggest unique product names based on niche and product details.
*   **Social Media Caption Generation:** Create engaging captions for various social media platforms based on a subject.
*   **"About Us" Page Generation:** Generate an "About Us" page narrative based on the store's creation story, unique selling points, and brand information.
*   **Usage Tracking:** Users have a description count based on their subscription plan, which is debited upon generation (skipped in demo mode). Counts reset monthly.
*   **Email Notifications:** Sends generated single descriptions to the user's email via Mailgun (skipped in demo mode).
*   **Subscription Management:** Handles different subscription tiers (`starter`, `growth`, `business`) with corresponding description limits. Integrates with SendFox for email list management based on subscription status (skipped in demo mode).

## Tech Stack

*   **Frontend:** React, Tailwind CSS, Auth0 React SDK, Axios, React Router
*   **Backend:** Node.js, Express, MongoDB (with Mongoose), OpenAI API, JSON Web Tokens (JWT), Nodemailer (with Mailgun), Bull (dependency present, usage limited), node-cron, Jest
*   **Database:** MongoDB Atlas
*   **Email:** Mailgun (Used only if `NODE_ENV` is not `demo`)
*   **Email Marketing:** SendFox (Used only if `NODE_ENV` is not `demo`)
*   **Deployment:** Heroku (implied by `Procfile`) / Netlify (implied by `_redirects`)

## Project Structure 