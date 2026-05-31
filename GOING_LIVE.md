# Wandr — Going Live Checklist

## Overview
AI travel planning app. Revenue via affiliate commissions (hotels, flights) + alphinium-ads. No GDS needed at launch.

## Step 1: Real Affiliate Links (~few hours)
Replace placeholder "Book" buttons with real affiliate links:

### Hotels — Booking.com Affiliate
1. Apply: [booking.com/affiliate-program](https://www.booking.com/affiliate-program)
2. Approval: usually 1-2 business days
3. Replace hotel CTAs with deep links:
   ```
   https://booking.com/searchresults.html?aid=YOUR_AID&city=tokyo
   ```
4. Commission: ~4-6% of booking value

### Booking.com / Expedia / Hotels Combined
- Expedia Affiliate Network (EAN): higher commissions, better inventory
- Hotels Combined: aggregator, pays per click (~$0.50-2.00 CPC)

### Flights — Skyscanner Affiliate
1. Apply: [partners.skyscanner.net](https://partners.skyscanner.net)
2. Deep link to flight search: `https://skyscanner.com/flights/syd/tyo/...?affiliateId=...`
3. Revenue: ~$0.20-1.00 per click-out (no booking required)

## Step 2: Real Destination Data (~1 day)
- **TripAdvisor API** — attractions, reviews, photos (free tier available)
- **Google Places API** — hotel search, photos, ratings
- **Amadeus Dev API** — free tier for hotel/flight availability data
  - `GET /v2/shopping/hotel-offers?cityCode=TYO&checkInDate=...`

## Step 3: alphinium-ai Real Travel Agent
1. Connect GPT-4 / Claude to the AI search
2. System prompt: "You are a knowledgeable travel agent..."
3. Parse user intent → call real destination/hotel API → return structured results
4. Add voice: user speaks their destination, agent responds in voice

## Step 4: alphinium-maps Integration
- Hotel pins on map are currently emoji divIcons
- Upgrade to alphinium-maps with custom hotel/attraction icons
- Add route planning between attractions

## Step 5: Deploy
1. Web: Netlify/Vercel — `wandr.alphinium.com` or `getwandr.com`
2. iOS/Android via Expo
3. alphinium-ads for banner revenue between search results

## Revenue Estimate (1000 MAU)
| Source | Monthly |
|---|---|
| Hotel affiliate (5% × avg $200 booking × 5% conversion) | ~$500 |
| Flight click-out ($0.50 CPC × 500 clicks) | ~$250 |
| alphinium-ads | ~$150 |
| **Total** | **~$900/mo** |
