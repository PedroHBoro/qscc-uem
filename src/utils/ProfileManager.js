export class ProfileManager {
  constructor() {
    this.scores = {
      softwareEngineering: 0,
      computerScience: 0,
    };
  }

  addPoints(course, points) {
    if (this.scores.hasOwnProperty(course)) {
      this.scores[course] += points;
    }
  }

  getRecommendation() {
    if (this.scores.softwareEngineering > this.scores.computerScience) {
      return 'Engenharia de Software';
    } else if (this.scores.computerScience > this.scores.softwareEngineering) {
      return 'Ciência da Computação';
    } else {
      return 'Ambos os cursos parecem uma boa opção para você!';
    }
  }
}
