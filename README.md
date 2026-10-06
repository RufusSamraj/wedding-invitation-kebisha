# Kebisha Bright & Charles Salamon — animated wedding invitation

A responsive, dependency-free wedding invitation website for Kebisha Bright and Charles Salamon. The ceremony and reception share St. Matthew’s Church, East Tambaram, on **20 November 2026**; the countdown targets **3:00 PM India Standard Time**. Names, times, locations, copy, photos and the countdown target are easy to customize.

## Preview locally

Open `index.html` in a browser. For a local server with Node.js installed, run `npx serve .` from this folder and open the printed local address. No package install or build step is required.

## Make it yours

1. In `index.html`, update the names, date, ceremony and reception times, venue/address, map link, Bible verse, and photo URLs/alt text.
2. In `script.js`, update `weddingDate` using an ISO date and the event's timezone offset. Example for 3:00 PM IST: `new Date('2026-11-20T15:00:00+05:30')`.
3. Replace the `images.unsplash.com` photo URLs with your own optimized images. For a private event, use images you have permission to publish.
4. Paste the soundtrack URL into the `MUSIC_URL` constant at the top of `script.js`, for example `const MUSIC_URL = 'https://www.youtube.com/watch?v=VIDEO_ID';`. The chosen track attempts to start when a guest opens the envelope. Browsers require that tap before allowing sound. Guests do not enter or choose a URL.
   - YouTube video links play in an embedded YouTube player.
   - Other websites must provide a direct playable audio URL (such as MP3, M4A, OGG or WAV). A regular webpage link cannot be used as an audio stream.
5. Update the page title and description in the `<head>` of `index.html`.

## Deploy with free Netlify hosting and RSVP collection

Netlify detects the included HTML form after deploy and stores guest responses in the site's **Forms** area. Form notifications can be configured in Netlify. Free-tier limits and terms can change, so check your account's current plan before the event.

1. Create a free account at [Netlify](https://www.netlify.com/).
2. Drag the complete `ever-after-invitation` folder (the one containing `index.html`) onto [Netlify Drop](https://app.netlify.com/drop). Or commit this folder to GitHub and import the repository in Netlify with publish directory `.`.
3. Open the deployed site URL and submit one test RSVP. In Netlify, check **Forms → wedding-rsvp** to confirm the submission arrived.
4. Set the site name under **Domain management** to get a memorable `*.netlify.app` URL. Add a custom domain only if you want one.
5. Before sharing, submit and verify one RSVP, inspect the page on a phone, and confirm the Maps links point to the correct venues.

For GitHub Pages or other static hosts, the invitation itself works as-is, but the Netlify form will not collect responses. Keep Netlify hosting for the no-backend RSVP setup, or replace the form `action` with your chosen form provider.

## Included

- Sealed-envelope opening intro
- Responsive ivory, sage, floral-photo and gold visual style
- Music URL configured directly in `script.js`; starts after the envelope-opening tap when a link is configured
- Couple photo gallery, scripture blessing and live countdown
- Ceremony/reception details with Google Maps directions
- RSVP form configured for Netlify Forms, with spam honeypot and confirmation page
- Mobile layout, scroll reveal transitions and reduced-motion accommodation
