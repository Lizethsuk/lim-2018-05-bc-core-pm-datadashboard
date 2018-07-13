# Dashboard

### Este Dashboard permite:

| Interfaz | Sí o No |
|--------------------------|----------------|
| Ver el listado de alumnas | ✅
| Seleccionar un cohort de una lista de países| ✅
| Seleccionar un cohort de una lista de cohorts| ✅
| Calcular el porcentaje de quizzes | ✅
| Calcular el porcentaje de lecturas | ✅
| Calcular el porcentaje de ejercicios | ✅
| Calcular el grado de completitud general | ✅


## Quiénes son los principales usuarios de producto.
Los principales ususarios de este producto son los Training managers de LABORATORIA, encargados de analizar el desempeño de cada estudiante del bootcamp. Este datadashboard contiene información importante de todos las participantes del proceso de admision, estudiantes de bootcamp y de educacion continua.

## Cuáles son los objetivos de estos usuarios en relación con el producto.
El objetivo principal es obtener la informacion del desempeño de las alumnas de manera facil y ordenada, visualizado la tendencia de su aprendizaje a nivel grupal para tomar decisiones según ello. También permite verificar informacion por alumna y proceder segun amerite, para el bien de ellas mismas.

## Cuáles son los datos más relevantes que quieren ver en la interfaz y por qué. Cómo los descubriste.
Realizamos una  entrevista a Alejandra Ramirez, training manager de Lima, con el fin de obtener información importante para desarrollar el producto. 

En este entrevista obtuvimos datos relevantes, como el grado de importancia de la información: los ejercicios son la manera más reveladora del avance de las alumnas, es por ello que lo ubicamos solo despues del porcentaje de completitud general de revision del LMS.
Obtuvimos también la frecuencia de la revisión de los datos: en el caso del proceso de admision, estos resultados han sido verificados luego del mes y medio en que se realizo este proceso. 

## Cómo crees que el producto les está resolviendo sus problemas.
Lo hace en medida que la informacion es accesible, entendible y objetiva; además de ser dinamica. Otro punto importante es que este dashboard puede ser visualizado en otros dispositivos, como tablets y celulares, lo cual permite tener la información a la mano donde sea.

## Cómo fue tu proceso de diseño.
El diseño de este producto fue ideado con la premisa de ser lo más claro posible para no generar confusion ni tedio al momento de visualizar los datos. 

Para ello primero realizamos el prototipado por medio de un sketch. 
### SKETCH:

![SKETCH](https://crisescobar.files.wordpress.com/2018/07/36493729_10211921784543536_8746538630144589824_n-e1530561577878.jpg)

Este sketch nos dio una guía de cuál sería el flujo de la información del dashboard. 

Continuando con el proceso de diseño, elaboramos un prototipo de alta fidelidad en FIGMA, para poder darnos una guía de como sería el diseño, se puede ver en este link: https://www.figma.com/file/Qs0GExH5hp2NUxbnVrbgJ4wT/GENERAL

Luego, comenzamos a aplicarlo a nuestra interfaz principal que incluye todos los requerimientos. Implementamos 4 selectores en la sección de alumnas:
* El primero contendrá la lista de sedes de laboratoria categorizada por países.
* El segundo tendrá la lista de cohorts de la sede elegida en el paso anterior.Este ultimo permitira la visualizacion de una tabla con los nombres de todas las alumnas de la sede y el cohort seleccionado; contendrá informacion de completitud: general, exercises, quizzes y reads; tambien de score de quizzes: promedio y total.
* El tercer selector tendrá opciones de ordenado: por alumnas; completitud: general, exercises, quizzes y reads; tambien de score de quizzes: promedio y total.
* El cuarto selector tendrá dos opciones del sentido de ordenado: ascendente y descendente, que se activará luego de selecionar el selector de ordenado.
Asimismo, incluimos también un input de buscador.

Nuestra pantalla principal quedaría así:

![PANTALLA-PRINCIPAL](https://crisescobar.files.wordpress.com/2018/07/pantallas.png)


Elaboramos también las versiones responsive para tablets y celulares: 

### Tablet
![tablet](https://crisescobar.files.wordpress.com/2018/07/tablet.png)

### Celular
![celular](https://crisescobar.files.wordpress.com/2018/07/celular.png)

Asimismo, agregamos una página de inicio para que el usuario (training manager) pudiera iniciar sesión en nuestro Dashboard mediante un usuario y una contraseña.

![inicio](https://crisescobar.files.wordpress.com/2018/07/inicio-pantalla.png)

Utilizamos los colores y la tipografía correspondiente a la línea gráfica de Laboratoria, incluimos imágenes e íconos para que el usuario se sienta identificado con Laboratoria. 



