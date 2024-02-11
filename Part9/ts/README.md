# FSO Part 9

  Typescript 

### 9.1 Body mass index

  - function that calculate BMI on a given hardcoded height(centimeters) and weight (kilograms)

  - npm script to run the programm: npm run calculateBmi

### 9.2 Exercise calculator

  - function that calculates the average time of daily exercise hours and compare with target value, return:

      input: daily time by days: [3, 0, 2, 4.5, 0, 3, 1] and target value: 2
      output: 
        { periodLength: 7,              the number of days
          trainingDays: 5,              the number of training days
          success: false,               boolean, was the goal achieved
          rating: 2,                    range (1,3), how well the hours are met
          ratingDescription: 'not too bad but could be better',   string, expain rating
          target: 2,                    the original target value
          average: 1.9285714285714286   the calculated average time
        }
