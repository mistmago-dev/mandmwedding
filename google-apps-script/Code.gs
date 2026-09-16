const SHEET_NAME = 'RSVPs';

function doPost(event) {
	const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
	const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
	const data = JSON.parse(event.postData.contents);

	if (sheet.getLastRow() === 0) {
		sheet.appendRow(['Submitted at', 'Full name', 'Email / contact', 'Number of guests', 'Guest names', 'Message']);
	}

	sheet.appendRow([
		new Date(),
		data.fullName || '',
		data.contact || '',
		data.guestCount || 1,
		data.guestNames || '',
		data.message || '',
	]);

	return ContentService.createTextOutput(JSON.stringify({ success: true })).setMimeType(ContentService.MimeType.JSON);
}
