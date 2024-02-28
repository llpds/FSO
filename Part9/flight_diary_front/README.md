# FSO Part 9

  Flight diary app frontend

### 9.16 

  - react app. Fetch the diaries from the backend and render those to screen
  - ts types

### 9.17, 9.18, 9.19

  - adding diaries
  - error message if diary entry creation fails in the backend.
  - input forms, controlled components
    date: date input element
    weather and visibility: radio buttons

    !!! onChange 
    Type '(e: SyntheticEvent<HTMLButtonElement>) => void' is not assignable to type 'ChangeEventHandler<HTMLInputElement>'.

    when implement MaterialUI, use (event: SelectChangeEvent<string>)