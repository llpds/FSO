# FSO part 6

  - Redux

  ### 6.3: anecdotes, step1
    - vote functionality w/o component


  ### :( 
    component not working:
      PM [vite] Internal server error: Failed to parse source for import analysis because the content contains invalid JS syntax. If you are using JSX, make sure to name the file with the .jsx or .tsx extension.

    console:
      App.jsx:5 Selector unknown returned the root state when called. This can lead to unnecessary rerenders.
      Selectors that return the entire state are almost certainly a mistake, as they will cause a rerender whenever *anything* in state changes.