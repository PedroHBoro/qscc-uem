import { google } from 'googleapis';

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).send({ message: 'Only POST requests allowed' });
  }

  try {
    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const sheets = google.sheets({ version: 'v4', auth });

    const data = request.body;
    const spreadsheetId = process.env.SPREADSHEET_ID;
    const sheetName = 'Respostas';

    if (!data || !spreadsheetId) {
      return response.status(400).send({ message: 'Missing data or spreadsheet ID.' });
    }

    const values = [Object.values(data)];
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: sheetName,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: { values },
    });

    return response.status(200).send({ message: 'Data saved successfully!' });

  } catch (error) {
    console.error('Vercel API Error:', error);
    return response.status(500).send({ message: 'Failed to save data.', error: error.message });
  }
}