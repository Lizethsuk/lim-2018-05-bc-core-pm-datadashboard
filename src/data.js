window.computeUsersStats = (users, progress, courses) => {
  users.forEach(user => {
    let userId = user.id
    const progressUser = progress[userId];
    courses.forEach(nameCourses => {
      if (progressUser.hasOwnProperty(nameCourses)) {
        let scorePercent = 0;
        let contadorTotalQuizzes = 0;
        let contadorActualQuizzes = 0;
        let contadorTotalReads = 0;
        let contadorActualReads = 0;
        let contadorTotalExercises = 0;
        let contadorActualExercises = 0;
        let contadorScoreSum = 0;
        scorePercent += progressUser[nameCourses].percent;
        //console.log(scorePercent); 
        const arrUnitsValues = Object.values(progressUser[nameCourses].units);
        //console.log(Object.keys(progressUser[course].units));
        arrUnitsValues.forEach(elementUnitsValues => {
          const partsElements = Object.values(elementUnitsValues.parts);
          partsElements.forEach(part => {
            //console.log(part);
            if (part.type === 'read') {
              contadorTotalReads++;
              //console.log(contadorTotalReads)
              if (part.completed === 1) {
                contadorActualReads++;
                // console.log(contadorActualReads)  
              }
            }
            if (part.type === 'practice' && part.hasOwnProperty("exercises")) {

              let arrContadorExercises = Object.keys(part.exercises);
              contadorTotalExercises += arrContadorExercises.length;
              contadorActualExercises += part.completed;
            }
            if (part.type === 'quiz') {
              contadorTotalQuizzes++;
              if (part.completed === 1 && part.hasOwnProperty("score")) {
                contadorActualQuizzes++;
                contadorScoreSum += part.score;
              }

              //console.log(progressUser[course].units[elementSubject].parts[part].completed)                            
            }
          })
        })
        user.stats = {
          percent: scorePercent,
          exercises: {
            total: contadorTotalExercises,
            completed: contadorActualExercises,
            percent: Math.round(contadorActualExercises * 100)
          },
          reads: {
            total: contadorTotalReads,
            completed: contadorActualReads,
            percent: Math.round(contadorActualReads * 100 / contadorTotalReads)
          },
          quizzes: {
            total: contadorTotalQuizzes,
            completed: contadorActualQuizzes,
            percent: Math.round(contadorActualQuizzes * 100 / contadorTotalQuizzes),
            scoreSum: contadorScoreSum,
            scoreAvg: Math.round(contadorScoreSum / contadorTotalQuizzes)
          },
        }
      } else {
        user.stats = {
          percent: 0,
          exercises: {
            total: 0,
            completed: 0,
            percent: 0
          },
          reads: {
            total: 0,
            completed: 0,
            percent: 0
          },
          quizzes: {
            total: 0,
            completed: 0,
            percent: 0,
            scoreSum: 0,
            scoreAvg: 0
          },
        }
      };
    })
  })
  return users;
}

window.sortUsers = (users, orderBy, orderDirection) => {
  let usersSort = users;
  if (orderBy.length !== 0) {
    usersSort = users.sort((a, b) => {
      if (orderBy === "name") {
        let nameCompare = a.name.localeCompare(b.name);
        return nameCompare;
      } else if (orderBy === "percent") {
        if (a.stats[orderBy] > b.stats[orderBy]) return 1;
        if (a.stats[orderBy] < b.stats[orderBy]) return -1;
        return 0;
      } else if (orderBy === "percentExercises") {
        if (a.stats.exercises.percent > b.stats.exercises.percent) return 1;
        if (a.stats.exercises.percent < b.stats.exercises.percent) return -1;
        return 0;
      } else if (orderBy === "percentQuizzes") {
        if (a.stats.quizzes.percent > b.stats.quizzes.percent) return 1;
        if (a.stats.quizzes.percent < b.stats.quizzes.percent) return -1;
        return 0;
      } else if (orderBy === "scoreSum") {
        if (a.stats.quizzes.scoreSum > b.stats.quizzes.scoreSum) return 1;
        if (a.stats.quizzes.scoreSum < b.stats.quizzes.scoreSum) return -1;
        return 0;
      } else if (orderBy === "scoreAvg") {
        if (a.stats.quizzes.scoreAvg > b.stats.quizzes.scoreAvg) return 1;
        if (a.stats.quizzes.scoreAvg < b.stats.quizzes.scoreAvg) return -1;
        return 0;
      } else if (orderBy === "percentReads") {
        if (a.stats.reads.percent > b.stats.reads.percent) return 1;
        if (a.stats.reads.percent > b.stats.reads.percent) return -1;
        return 0;
      }
    })
  }
  if (orderDirection === "DESC") {
    usersSort = usersSort.reverse();
  }
  return usersSort;
}
window.filterUsers = (users, search) => {
  if (search.length !== 0) {
    search = search.tolowerCase();
    return users.filter(user => user &&
      user.name &&
      user.name.tolowerCase().indexof(search) >= 0)
  }
  return users
}
window.processCohortData = (options) => {
  const coursesCohort = Object.keys(options.cohort.coursesIndex);
  const usersStats = computeUsersStats(options.cohortData.users, options.cohortData.progress, coursesCohort);
  const orderUsers = sortUsers(usersStats, options.orderBy, options.orderDirection)
  const usersFilter = filterUsers(orderUsers, options.search);
  return usersFilter;
}