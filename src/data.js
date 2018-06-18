window.data = {
  computeUsersStasts: () => {
    
  },
  sortUsers: () => {

  },
  filterUsers: () => {

  },
  prcessCohortData: () => {
    
  } 
}

let nombreUsuarios = document.getElementById('nombre');
let cohorts = document.getElementById('cohorts')

fetch('../data/cohorts.json')
 .then((response) => {
   return response.json();
 })
 .then((myCohort) => {
   let nombreCohort = '';
   for (i = 0; i < myCohort.length; i++) {
     nombreCohort += '<option value="' + myCohort[i].id + '">' + myCohort[i].id + '</option>';
   }
   cohorts.innerHTML = nombreCohort;
   cohorts.addEventListener('change', () => {
     fetch('../data/cohorts/' + cohorts.value + '/users.json')
       .then((response) => {
         return response.json();
       })
       .then((myUser) => {
         let caracter = '';
         caracter += '<tr>';
         caracter += '<th> Nombres </th>';
         caracter += '<th> General % </th>';
         caracter += '<th> Ejercicios % </th>';
         caracter += '<th> Quiz % </th>';
         caracter += '<th> Lecturas % </th>';
         caracter += '</tr>'
         fetch('../data/cohorts/' + cohorts.value + '/progress.json')
           .then((response) => {
             return response.json();
           })
           .then((myProgress) => {
             let progresoIds = Object.entries(myProgress);
             for (i = 0; i < myUser.length; i++) {
               caracter += '<tr>';
               caracter += '<td id= "nombrestabla">' + myUser[i].name + '</td>';
               if(myProgress.hasOwnProperty(myUser[i].id)) {
                 const progressUser = myProgress[myUser[i].id];
                 if(progressUser.hasOwnProperty('intro')){
                   const intro = progressUser.intro;
                   const unitIntroduction = intro.units['01-introduction'];
                   const unitVariables = intro.units['02-variables-and-data-types'];
                   const unitUx = intro.units['03-ux-design'];
                   const resultadoExecises = unitVariables.parts['06-exercises'].completed ;
                   const resultadoQuiz = unitIntroduction.parts['04-quiz'].completed + unitVariables.parts['05-quiz'].completed + unitUx.parts['03-quiz'].completed;
                   const resultadoLecturas = unitIntroduction.parts['00-welcome-and-orientation'].completed + unitIntroduction.parts['01-growth-mindset'].completed +unitIntroduction.parts['02-why-learn-to-code'].completed + unitIntroduction.parts['03-your-first-website'].completed + unitVariables.parts['00-values-data-types-and-operators'].completed + unitVariables.parts['01-variables'].completed + unitVariables.parts['02-self-learning-MDN'].completed + unitVariables.parts['03-comments'].completed + unitUx.parts['00-development-team'].completed + unitUx.parts['01-ux-design'].completed + unitUx.parts['02-ux-design-vs-ui-design'].completed;
                   if (intro.hasOwnProperty('percent')) {
                     caracter += '<td>' + intro.percent + '</td>';
                       caracter += '<td>'+ resultadoExecises*100 +'</td>';
                       caracter += '<td>' + parseInt(resultadoQuiz * 100 / 3) + '</td>';
                       caracter += '<td>' + parseInt(resultadoLecturas * 100 / 11) + '</td>';
                       caracter += '</tr>';
                   }
                 } else {
                   caracter += '<td>No inicio</td>';
                   caracter += '<td>No inicio</td>';
                   caracter += '<td>No inicio</td>';
                   caracter += '<td>No inicio</td>';
                   caracter += '</tr>';
                 }
               }
             }
             nombreUsuarios.innerHTML = caracter;
           })
       })
   })
 })
