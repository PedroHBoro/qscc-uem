import express from 'express';
import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const app = express();
const PORT = 3001;

app.use(express.json());

app.post('/api/saveData', async (req, res) => {
  try {
    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const sheets = google.sheets({ version: 'v4', auth });

    const data = req.body;
    const spreadsheetId = process.env.SPREADSHEET_ID;
    const sheetName = 'Respostas';

    if (!data || !spreadsheetId) {
      return res.status(400).send({ message: 'Missing data or spreadsheet ID.' });
    }

    const values = [Object.values(data)];
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: sheetName,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: { values },
    });

    res.status(200).send({ message: 'Data saved successfully!' });

  } catch (error) {
    console.error('Error in /api/saveData:', error);
    res.status(500).send({ message: 'Failed to save data.', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`[server.js] API server running on http://localhost:${PORT}`);
});
