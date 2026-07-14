# Team Ford – Setup Guide

## What you need
- A Google account (for Google Sheets + Apps Script)
- Access to your domain host (to point teamford.heytoriford.com to your host)
- The files in this folder uploaded to your web host

---

## Step 1 – Create the Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new spreadsheet
2. Name it **Team Ford Submissions** (or anything you like)
3. Copy the **Sheet ID** from the URL — it's the long string between `/d/` and `/edit`:
   ```
   https://docs.google.com/spreadsheets/d/THIS_IS_THE_ID/edit
   ```

---

## Step 2 – Deploy the Google Apps Script

1. Go to [script.google.com](https://script.google.com) and click **New project**
2. Name the project **Team Ford Form**
3. Delete any existing code and paste the contents of `Code.gs` into the editor
4. At the top of the script, replace `YOUR_GOOGLE_SHEET_ID_HERE` with the ID from Step 1
5. Click **Save** (Ctrl+S / Cmd+S)
6. Click **Deploy → New deployment**
7. Click the gear icon next to "Type" and choose **Web app**
8. Set:
   - **Execute as:** Me
   - **Who has access:** Anyone
9. Click **Deploy**
10. Copy the **Web app URL** — it looks like:
    ```
    https://script.google.com/macros/s/XXXXXXXXXX/exec
    ```

---

## Step 3 – Connect the form to your script

1. Open `index.html` in a text editor
2. Find this line near the bottom:
   ```js
   const APPS_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```
3. Replace `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with the URL from Step 2

---

## Step 4 – Upload files to your web host

Upload these files to the root of your hosting at `teamford.heytoriford.com`:

```
index.html           ← the form page
Fallin-Tides-Cover.png  ← the book cover image
```

> **Note:** `Code.gs` and `SETUP.md` are for reference only — do NOT upload them to your web host.

---

## Step 5 – Test it

1. Visit `https://teamford.heytoriford.com`
2. Fill out the form and submit
3. Check that:
   - A new row appears in your Google Sheet
   - A notification email arrives at tori@heytoriford.com
   - The form shows a success message

---

## Troubleshooting

**Form shows an error after submitting**
- Make sure the Apps Script is deployed as a Web app with "Anyone" access
- Re-deploy after any code changes (each deploy creates a new URL — update `index.html` with the new URL)

**No email received**
- Check your Google account's Gmail Sent folder to confirm Apps Script sent it
- Apps Script uses your Gmail quota (100 emails/day on free accounts)

**Book cover not showing**
- Make sure `Fallin-Tides-Cover.png` is in the same folder as `index.html` on your server
