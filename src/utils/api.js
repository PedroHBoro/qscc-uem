export async function savePlayerData(data, sheet) {
  try {
    const response = await fetch(`/api/saveData?sheet=${sheet}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toLocaleString()
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to save player data');
    }
  } catch (error) {
    console.error('Error saving player data:', error);
  }
}