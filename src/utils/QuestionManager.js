export class QuestionManager {
  constructor() {
    this.questions = [
      {
        text: 'Você prefere trabalhar em equipe ou sozinho?',
        choices: ['Equipe', 'Sozinho'],
        scores: ['softwareEngineering', 'computerScience'],
      },
      {
        text: 'Qual área te atrai mais?',
        choices: ['Desenvolvimento de Software', 'Inteligência Artificial'],
        scores: ['softwareEngineering', 'computerScience'],
      },
      {
        text: 'O que você valoriza mais em um projeto?',
        choices: ['Processos bem definidos', 'Liberdade para experimentar'],
        scores: ['softwareEngineering', 'computerScience'],
      },
    ];
    this.currentQuestionIndex = 0;
  }

  getCurrentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      return true;
    }
    return false; // No more questions
  }
}
