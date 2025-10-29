
export async function saveData(data) {
  try {
    const response = await fetch('/api/saveData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      // Se a resposta do servidor não for de sucesso, lança um erro
      const errorResult = await response.json();
      throw new Error(errorResult.message || 'Failed to save data');
    }

    const result = await response.json();
    console.log('API response:', result.message);
    return result;

  } catch (error) {
    console.error('Error calling saveData API:', error);
    // Re-lança o erro para que o código que chamou a função possa tratá-lo
    throw error;
  }
}
