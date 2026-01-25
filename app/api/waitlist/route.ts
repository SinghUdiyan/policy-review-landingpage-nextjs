import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

function getIndianTimestamp(): string {
  const now = new Date();
  
  // Format in Indian Standard Time (IST - Asia/Kolkata)
  // Format: DD/MM/YYYY HH:MM:SS IST
  const formatter = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
  
  const parts = formatter.formatToParts(now);
  const day = parts.find(p => p.type === 'day')?.value || '';
  const month = parts.find(p => p.type === 'month')?.value || '';
  const year = parts.find(p => p.type === 'year')?.value || '';
  const hour = parts.find(p => p.type === 'hour')?.value || '';
  const minute = parts.find(p => p.type === 'minute')?.value || '';
  const second = parts.find(p => p.type === 'second')?.value || '';
  
  return `${day}/${month}/${year} ${hour}:${minute}:${second} IST`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, mobile, email, insuranceCompany } = body;

    if (!fullName || !mobile) {
      return NextResponse.json(
        { message: "Full name and mobile are required." },
        { status: 400 }
      );
    }

    const sheetId = process.env.GOOGLE_SHEET_ID;
    const credentialsJson = process.env.GOOGLE_SHEETS_SERVICE_ACCOUNT_JSON;

    if (!sheetId || !credentialsJson) {
      console.error("Missing GOOGLE_SHEET_ID or GOOGLE_SHEETS_SERVICE_ACCOUNT_JSON");
      return NextResponse.json(
        { message: "Waitlist is not configured. Please try again later." },
        { status: 503 }
      );
    }

    let credentials: object;
    try {
      const parsed = JSON.parse(credentialsJson) as Record<string, unknown>;
      // Ensure private_key has actual newlines (not escaped \n)
      if (typeof parsed.private_key === "string") {
        parsed.private_key = parsed.private_key.replace(/\\n/g, "\n");
      }
      credentials = parsed;
    } catch (e) {
      console.error("Invalid GOOGLE_SHEETS_SERVICE_ACCOUNT_JSON:", e);
      return NextResponse.json(
        { message: "Server configuration error. Please try again later." },
        { status: 503 }
      );
    }

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const values = [
      [
        fullName,
        mobile,
        email || "",
        insuranceCompany || "",
        getIndianTimestamp(),
      ],
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: "Sheet1!A:E",
      valueInputOption: "RAW",
      requestBody: { values },
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Waitlist API error:", e);
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
