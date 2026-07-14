// ============================================================
// Team Ford – Google Apps Script Backend
// Handles form submissions: saves to Google Sheet + sends email
// ============================================================

// ── CONFIGURATION ──────────────────────────────────────────
const SPREADSHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE'; // from the Sheet URL
const SHEET_NAME = 'Submissions';
const NOTIFY_EMAIL = 'tori@heytoriford.com';
// ───────────────────────────────────────────────────────────

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    const firstName  = data.firstName  || '';
    const lastName   = data.lastName   || '';
    const email      = data.email      || '';
    const igLink     = data.igLink     || '';
    const tiktokLink = data.tiktokLink || '';
    const timestamp  = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });

    // 1. Append row to Google Sheet
    const ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    // Add header row if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'First Name', 'Last Name', 'Email', 'Instagram', 'TikTok']);
      sheet.getRange(1, 1, 1, 6).setFontWeight('bold');
    }

    sheet.appendRow([timestamp, firstName, lastName, email, igLink, tiktokLink]);

    // 2. Send notification email
    const subject = `New Team Ford Application – ${firstName} ${lastName}`;
    const body = `
A new Team Ford application has been received!

━━━━━━━━━━━━━━━━━━━━━━━━
Name:      ${firstName} ${lastName}
Email:     ${email}
Instagram: ${igLink || '(not provided)'}
TikTok:    ${tiktokLink || '(not provided)'}
Submitted: ${timestamp}
━━━━━━━━━━━━━━━━━━━━━━━━

Log in to your Google Sheet to review all submissions:
https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}
    `.trim();

    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: subject,
      body: body,
    });

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Allow preflight / GET requests without breaking
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ result: 'ok', message: 'Team Ford endpoint is live.' }))
    .setMimeType(ContentService.MimeType.JSON);
}
