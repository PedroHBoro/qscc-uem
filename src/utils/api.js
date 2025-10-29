export async function savePlayerData(data) {
  try {
    const response = await fetch('/api/saveData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to save player data');
    }

    console.log('Player data saved successfully');
  } catch (error) {
    console.error('Error saving player data:', error);
  }
}