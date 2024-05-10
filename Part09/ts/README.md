# FSO Part 9

  Typescript 

### 9.1 Body mass index

  - function that calculate BMI on a given hardcoded height(centimeters) and weight (kilograms)

  - npm script to run the programm: npm run calculateBmi

### 9.2 Exercise calculator

  - function that calculates the average time of daily exercise hours and compare with target value

### 9.3 Command line

  - The two previous functions receive parameters from the console
      CLI: npm run calculateExercises 2 3 0 2 4.5 0 3 1
      CLI: npm run calculateBmi 180 74

### 9.4 Express

  - express, endpoitn hello, answer 'Hello Full Stack!'
    prod: npm start
    dev: npm run dev
    port: 3003

### 9.5 WebBMI

  - endpoint bmi using calculateBmi
    GET http://localhost:3003/bmi?height=180&weight=72

### 9.6 EsLint

  - use ESlint and fix all warning

### 9.7 WebExercises

  - add endpoint to ExerciseCalculator 
    POST http://localhost:3002/exercises
    ! port = 3002, earlier it was 3003
