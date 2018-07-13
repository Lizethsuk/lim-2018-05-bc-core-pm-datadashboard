describe('data', () => {

  it('debería exponer función computeUsersStats en objeto global', () => {
    assert.isFunction(computeUsersStats);
  });

  it('debería exponer función sortUsers en objeto global', () => {
    assert.isFunction(sortUsers);
  });

  it('debería exponer función filterUsers en objeto global', () => {
    assert.isFunction(filterUsers);
  });

  it('debería exponer función processCohortData en objeto global', () => {
    assert.isFunction(processCohortData);
  });

  describe('computeUsersStats(users, progress, courses)', () => {

    const cohort = fixtures.cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw');
    const courses = Object.keys(cohort.coursesIndex);
    const { users, progress } = fixtures;

    it('debería retornar arreglo de usuarios con propiedad stats', () => {
      const processed = computeUsersStats(users, progress, courses);

      assert.equal(users.length, processed.length);

      processed.forEach(user => {
        assert.ok(user.hasOwnProperty('stats'));
        assert.isNumber(user.stats.percent);
        assert.isObject(user.stats.exercises);
        assert.isObject(user.stats.quizzes);
        assert.isObject(user.stats.reads);
      });
    });

    describe('user.stats para el primer usuario en data de prueba - ver carpeta data/', () => {

      const processed = computeUsersStats(users, progress, courses);

      it(
        'debería tener propiedad percent con valor 53',
        () => assert.equal(processed[0].stats.percent, 53)
      );

      it('debería tener propiedad exercises con valor {total: 2, completed: 0, percent: 0}', () => {
        assert.deepEqual(processed[0].stats.exercises, {
          total: 2,
          completed: 0,
          percent: 0,
        });
      });

      it('debería tener propiedad quizzes con valor {total: 3, completed: 2, percent: 67, scoreSum: 57, scoreAvg: 19}', () => {
        assert.deepEqual(processed[0].stats.quizzes, {
          total: 3,
          completed: 2,
          percent: 67,
          scoreSum: 57,
          scoreAvg: 19,
        });
      });

      it('debería tener propiedad reads con valor {total: 11, completed: 6, percent: 55}', () => {
        assert.deepEqual(processed[0].stats.reads, {
          total: 11,
          completed: 6,
          percent: 55,
        });
      });

    });

  });

  describe('sortUsers(users, orderBy, orderDirection)', () => {
    const usersOrder = fixtures.users;
    it('debería retornar arreglo de usuarios ordenado por nombre ASC', () => {
      const order = usersOrder.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
      const processed = sortUsers(usersOrder, 'name', 'ASC');
      assert.deepEqual(order, processed);
    });

    it('debería retornar arreglo de usuarios ordenado por nombre DESC', () => {
      const order = usersOrder.sort((a, b) => {
        if (a.name < b.name) {
          return 1;
        }
        if (a.name > b.name) {
          return -1;
        }
        return 0;
      });
      const processed = sortUsers(usersOrder, 'name', 'DESC');
      assert.deepEqual(order, processed);
    });

    it('debería retornar arreglo de usuarios ordenado por porcentaje general ASC', () => {
      const order = usersOrder.sort((a, b) => {
        if (a.stats.percent > b.stats.percent) {
          return 1;
        }
        if (a.stats.percent < b.stats.percent) {
          return -1;
        }
        return 0;
      });
      const processed = sortUsers(usersOrder, 'percent', 'ASC');
      assert.deepEqual(order, processed);
    });

    it('debería retornar arreglo de usuarios ordenado por porcentaje general DESC', () => {
      const order = usersOrder.sort((a, b) => {
        if (a.stats.percent < b.stats.percent) {
          return 1;
        }
        if (a.stats.percent > b.stats.percent) {
          return -1;
        }
        return 0;
      });
      const processed = sortUsers(usersOrder, 'percent', 'DESC');
      assert.deepEqual(order, processed);
    });
    it('debería retornar arreglo de usuarios ordenado por ejercicios completados ASC', () => {
      const order = usersOrder.sort((a, b) => {
        if (a.stats.exercises.percent > b.stats.exercises.percent) {
          return 1;
        }
        if (a.stats.exercises.percent < b.stats.exercises.percent) {
          return -1;
        }
        return 0;
      });
      const processed = sortUsers(usersOrder, 'exercises', 'ASC');
      assert.deepEqual(order, processed);
    });
    it('debería retornar arreglo de usuarios ordenado por ejercicios completados DESC', () => {
      const order = usersOrder.sort((a, b) => {
        if (a.stats.exercises.percent < b.stats.exercises.percent) {
          return 1;
        }
        if (a.stats.exercises.percent > b.stats.exercises.percent) {
          return -1;
        }
        return 0;
      });
      const processed = sortUsers(usersOrder, 'exercises', 'DESC');
      assert.deepEqual(order, processed);
    });
    it('debería retornar arreglo de usuarios ordenado por quizzes completados ASC', () => {
      const order = usersOrder.sort((a, b) => {
        if (a.stats.quizzes.percent > b.stats.quizzes.percent) {
          return 1;
        }
        if (a.stats.quizzes.percent < b.stats.quizzes.percent) {
          return -1;
        }
        return 0;
      });
      const processed = sortUsers(usersOrder, 'quizzes', 'ASC');
      assert.deepEqual(order, processed);
    });
    it('debería retornar arreglo de usuarios ordenado por quizzes completados DESC', () => {
      const order = usersOrder.sort((a, b) => {
        if (a.stats.quizzes.percent < b.stats.quizzes.percent) {
          return 1;
        }
        if (a.stats.quizzes.percent > b.stats.quizzes.percent) {
          return -1;
        }
        return 0;
      });
      const processed = sortUsers(usersOrder, 'quizzes', 'DESC');
      assert.deepEqual(order, processed);
    });
    it('debería retornar arreglo de usuarios ordenado por score promedio en quizzes completados ASC', () => {
      const order = usersOrder.sort((a, b) => {
        if (a.stats.quizzes.scoreAvg > b.stats.quizzes.scoreAvg) {
          return 1;
        }
        if (a.stats.quizzes.scoreAvg < b.stats.quizzes.scoreAvg) {
          return -1;
        }
        return 0;
      });
      const processed = sortUsers(usersOrder, 'scoreAvg', 'ASC');
      assert.deepEqual(order, processed);
    });
    it('debería retornar arreglo de usuarios ordenado por score promedio en quizzes completados DESC', () => {
      const order = usersOrder.sort((a, b) => {
        if (a.stats.quizzes.scoreAvg < b.stats.quizzes.scoreAvg) {
          return 1;
        }
        if (a.stats.quizzes.scoreAvg > b.stats.quizzes.scoreAvg) {
          return -1;
        }
        return 0;
      });
      const processed = sortUsers(usersOrder, 'scoreAvg', 'DESC');
      assert.deepEqual(order, processed);
    });
    
    it('debería retornar arreglo de usuarios ordenado por lecturas (reads) completadas ASC', () => {
      const order = usersOrder.sort((a, b) => {
        if (a.stats.reads.percent > b.stats.reads.percent) {
          return 1;
        }
        if (a.stats.reads.percent < b.stats.reads.percent) {
          return -1;
        }
        return 0;
      });
      const processed = sortUsers(usersOrder, 'reads', 'ASC');
      assert.deepEqual(order, processed);
    });
    it('debería retornar arreglo de usuarios ordenado por lecturas (reads) completadas DESC', () => {
      const order = usersOrder.sort((a, b) => {
        if (a.stats.reads.percent < b.stats.reads.percent) {
          return 1;
        }
        if (a.stats.reads.percent > b.stats.reads.percent) {
          return -1;
        }
        return 0;
      });
      const processed = sortUsers(usersOrder, 'reads', 'DESC');
      assert.deepEqual(order, processed);
    });

  });

  describe('filterUsers(users, filterBy)', () => {
    let userFilter = fixtures.users;
    it('debería retornar nuevo arreglo solo con usuarios con nombres que contengan string', () => {
      // let cohort = fixtures.cohorts.filter(cohort => cohort.id == 'lim-2018-03-pre-core-pw');
      // const { users, progress } = fixtures;
      let userData = [{
        id: "kcA7dfO7JcY3fK4WIyZNbVaXRsY2",
        timezone: "America/Lima",
        name: "Yanina CC",
        locale: "es-ES",
        signupCohort: "lim-2018-03-pre-core-pw",
        role: "student",
        stats: {
          percent: 100,
          exercises: {
            total: 2,
            completed: 1,
            percent: 100
          },
          reads: {
            total: 11,
            completed: 11,
            percent: 100
          },
          quizzes: {
            total: 3,
            completed: 3,
            percent: 100,
            scoreSum: 274,
            scoreAvg: 91
          }
        }
      },
      {
        id: "4Lf0NYN3ehYTPpjGwzsNeq0rRfe2",
        name: "Yanina",
        locale: "es-PE",
        signupCohort: "lim-2018-03-pre-core-pw",
        timezone: "America/Lima",
        role: "student",
        stats: {
          percent: 100,
          exercises: {
            total: 2,
            completed: 1,
            percent: 100
          },
          reads: {
            total: 11,
            completed: 11,
            percent: 100
          },
          quizzes: {
            total: 3,
            completed: 3,
            percent: 100,
            scoreSum: 284,
            scoreAvg: 95
          }
        }
      }
      ];

      const processed = filterUsers(userFilter, 'yanina');
      assert.deepEqual(userData, processed);
    });
  });
  describe('processCohortData({ cohortData, orderBy, orderDirection, filterBy })', () => {
    const cohort = fixtures.cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw');
    const courses = Object.keys(cohort.coursesIndex);
    let userCohort = fixtures.users;
    let progressCohort = fixtures.progress;
    it('debería retornar arreglo de usuarios con propiedad stats y aplicar sort y filter', () => {
      // let cohortSelect = fixtures.cohorts.filter(cohort => cohort.id == 'lim-2018-03-pre-core-pw');

      let userData = [{
        id: "nU8iAFoem8Oru5I3MzrfvMxXeuv2",
        timezone: "America/Lima",
        name: "Roxana",
        locale: "es-PE",
        signupCohort: "lim-2018-03-pre-core-pw",
        role: "student",
        stats: {
          percent: 100,
          exercises: {
            total: 2,
            completed: 1,
            percent: 100
          },
          reads: {
            total: 11,
            completed: 11,
            percent: 100
          },
          quizzes: {
            total: 3,
            completed: 3,
            percent: 100,
            scoreSum: 251,
            scoreAvg: 84
          }
        }
      },
      {
        id: "0B5g5B7K9eWm7CGiyhM3ArTawzA2",
        name: "Roxana Faviola Flores Amarillo",
        locale: "es-PE",
        signupCohort: "lim-2018-03-pre-core-pw",
        timezone: "America/Lima",
        role: "student",
        stats: {
          percent: 100,
          exercises: {
            total: 2,
            completed: 1,
            percent: 100
          },
          reads: {
            total: 11,
            completed: 11,
            percent: 100
          },
          quizzes: {
            total: 3,
            completed: 3,
            percent: 100,
            scoreSum: 215,
            scoreAvg: 72
          }
        }
      }
      ];
      const optionsCohort = {
        cohort: cohort,
        cohortData: {
          users: userCohort,
          progress: progressCohort
        },
        orderBy: 'name',
        orderDirection: 'ASC',
        search: 'roxana'
      }
      const processed = processCohortData(optionsCohort);
      assert.deepEqual(userData, processed);
    });
  });

});

