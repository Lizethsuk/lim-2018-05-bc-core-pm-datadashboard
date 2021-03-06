//Funcion display para index.html
mostrar = () => {
  document.getElementById("seccion-alumnas").style.display = 'none';    
}
const gen = document.getElementById('general'); //VARIABLE EVENTO CLICK GENERAL
const al = document.getElementById('alumnas');  // VARIABLE EVENTO CLICK ALUMNA

gen.addEventListener("click", () => {
  document.getElementById("seccion-general").style.display = 'inline-block';
  mostrar();
});

al.addEventListener("click", () => {
  document.getElementById("seccion-alumnas").style.display = 'inline-block';
  document.getElementById("seccion-general").style.display = 'none';
});

//Función y condiciones para usuario y contraseña de inicio.html
function validar () {
  const usuario = document.getElementById("usuario").value;
  const contraseña = document.getElementById("contraseña").value;

  if (usuario == "alejandra@laboratoria.la" && contraseña == "laboratorialima") {
    location.href = "../src/index.html";       //propiedad para direccionar a un link
  }
  else {
    alert("Usuario y/o contraseña inválidos. Por favor verifique sus datos.");
  }
}

const chooseCountry = document.getElementById("country");
const chooseCohort = document.getElementById("cohort");
const nombreUsuarios = document.getElementById('nombre');
const searchUser = document.getElementById('boxSearch');
const studentsOrderBy = document.getElementById('orderBy');
const studentsOrderDirection = document.getElementById('order');

const options = {
  cohort: null,
  cohortData: {
    users: null,
    progress: null
  },
  orderBy: '',
  orderDirection: '',
  search: ''
}

printData = (arrForPrint) => {
  let output = '';
  output +=
    `<tr>                                                  
    <th> Nombres </th>                                  
    <th> General % </th>
    <th> Ejercicios % </th>
    <th> Quiz % </th>
    <th> Score Quiz </th>
    <th> Promedio Quiz </th>
    <th> Lecturas % </th>
    </tr>`;
  arrForPrint.forEach(students => {                       //hacemos un recorrido de los usuarios                             
    if (students.role === "student") {
      output +=
        `<tr>
        <td id= "nombrestabla">${students.name}</td>
        <td>${students.stats.percent}</td> 
        <td>${students.stats.exercises.percent}</td>
        <td>${students.stats.quizzes.percent}</td>
        <td>${students.stats.quizzes.scoreSum}</td>
        <td>${students.stats.quizzes.scoreAvg}</td>
        <td>${students.stats.reads.percent}</td>
        </tr>`;
    }
  })
  return output;
}

chooseCountry.addEventListener('change', () => {                 
  fetch('../data/cohorts.json')                                  
    .then(response => response.json())
    .then(myCohorts => {                                       
      let output = '';                                           
      for (nameCohort of myCohorts) {                           
        const cohortsIds = nameCohort.id;                     
        const splitCohort = cohortsIds.split('-');             
        if (splitCohort[0] === chooseCountry.value) {        
          output +=
            `<option disabled selected hidden>Escoge tu cohort</option>
          <option value =${cohortsIds}>${cohortsIds}</option>`;       
        }
      }
      chooseCohort.innerHTML = output;                                                     
    })
})

chooseCohort.addEventListener('change', () => {                          
  fetch('../data/cohorts.json')
    .then(response => response.json())
    .then(selectCohort => {
      selectCohort.forEach(objectCohortSelect => {
        if (objectCohortSelect.id === chooseCohort.value) {
          options.cohort = objectCohortSelect;
        }
      });
    })
  fetch(`../data/cohorts/${chooseCohort.value}/users.json`)          
    .then(response => response.json())
    .then(arrUsers => {                                                                                     
      fetch(`../data/cohorts/${chooseCohort.value}/progress.json`)    
        .then(response => response.json())
        .then(objectProgress => { 
          options.cohortData.users = arrUsers;
          options.cohortData.progress = objectProgress;
          let usersWithProgress = processCohortData(options);
          nombreUsuarios.innerHTML = printData(usersWithProgress);
        })
    })
})

searchUser.addEventListener('keyup', () => {
  options.search = searchUser.value;
  let usersWithProgress = processCohortData(options);
  nombreUsuarios.innerHTML = printData(usersWithProgress);
})

studentsOrderBy.addEventListener('change', () => {
  options.orderBy = studentsOrderBy.value;
  let usersWithProgress = processCohortData(options);
  nombreUsuarios.innerHTML = printData(usersWithProgress);
})

studentsOrderDirection.addEventListener('change', () => {
  options.orderDirection = studentsOrderDirection.value;
  let usersWithProgress = processCohortData(options);
  nombreUsuarios.innerHTML = printData(usersWithProgress);
})
