export class QuestionManager {
  constructor() {
    this.questions = [
      {
        text: '1. Como você imagina sua rotina ideal na universidade?',
        choices: [
          'Uma rotina mais flexível, com as aulas concentradas à noite, permitindo que você tenha o dia livre para um estágio, trabalho ou projetos pessoais.', 
          'Uma imersão total, com aulas e atividades de manhã e à tarde, vivendo o campus e se dedicando exclusivamente aos estudos'
        ],
        scores: ['softwareEngineering', 'computerScience'],
      },
      {
        text: '2. Você se considera uma pessoa que... ',
        choices: [
          'Gosta de ir a fundo nos problemas para entender por que funcionam, com foco na teoria e na descoberta da melhor solução possível? ', 
          'Gosta de construir coisas que funcionam no mundo real, com foco no processo, na organização e em entregar um produto final de alta qualidade?'
        ],
        scores: ['computerScience', 'softwareEngineering'],
      },
      {
        text: '3. Qual tipo de matemática te soa mais interessante?',
        choices: [
          'A matemática mais pura e fundamental, como Cálculo avançado e Álgebra, que serve de base para entender a lógica por trás de tudo.', 
          'A matemática mais aplicada, como Estatística, usada para tomar decisões, medir resultados e entender a viabilidade de um projeto.'
        ],
        scores: ['computerScience', 'softwareEngineering'],
      },
      {
        text: '4.  Como você prefere encarar sua formação?',
        choices: [
          'Como uma "maratona" mais distribuída, em um curso de 5 anos que permite um amadurecimento mais gradual das ideias', 
          'Como um "sprint" focado e intenso, em um curso projetado para ser concluído em 4 anos. '
        ],
        scores: ['softwareEngineering', 'computerScience'],
      },
      {
        text: '5. O que te dá mais curiosidade em um computador?',
        choices: [
          'Entender como usar o hardware da melhor forma possível, mas o foco principal é o software que roda nele.', 
          'Entender como as peças físicas (hardware, circuitos, processadores) realmente funcionam e se comunicam em nível fundamental.'
        ],
        scores: ['computerScience', 'softwareEngineering'],
      },
      {
        text: '6. Qual destes desafios soa mais empolgante?',
        choices: [
          'Aprender a gerenciar um projeto complexo, garantir a qualidade do software, analisar se ele dará lucro.', 
          'Estudar a fundo o que um computador é capaz de fazer e como criar uma nova linguagem de programação do zero.'
        ],
        scores: ['softwareEngineering', 'computerScience'],
      },
      {
        text: '7. Em qual destes papéis você se encaixaria melhor?',
        choices: [
          'Como um arquiteto, focado em projetar e supervisionar a construção de um sistema grande, complexo e confiável.', 
          'Como uma pessoa focada em investigar, descobrir e otimizar a lógica por trás das soluções.'
        ],
        scores: ['softwareEngineering', 'computerScience'],
      }
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
    return false;
  }
}
