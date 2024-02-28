# FSO Part 9

  Back end for Patientor, which is a simple medical record application for doctors who handle diagnoses and basic health information of their patients.


### 9.8: Patientor backend, step1

  - back for Patientor. Configured ESLint and tsconfig
      endpoint: http://localhost:3001/api/ping

### 9.9: Patientor backend, step2

  - front-end receives "pong" from back-end

### 9.10: Patientor backend, step3

  - diagnoses fetching
      endpoint: http://localhost:3001/api/diagnoses
      type: Diagnosis

### 9.11: Patientor backend, step4

  - patient to frontend, excluding field ssn
      endpoint: http://localhost:3001/api/patients
      type: Patient

### 9.12 - 9.13: Patientor backend, step5 - 6

  - adding patient functionality
      POST endpoint /api/patients
      uuid for creating unique id
  - safe parcing, valifation and type predicate, gender enum type

      