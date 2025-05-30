# [FSO part 10 - React Native](https://fullstackopen.com/en/part10)

academic hour(40 min):
  a & b: 30
  c: 2

a & b:
  - set environment: (5 * 40)
      Android studio:
        android 14 api 34
          Pixel 6 and 8: ok
      Xcode:
        iPhone 16 pro: ok
      web: ok

  - ex. 10.1: initializing the application (1 * 40)
  - ex. 10.2: (2 * 40)
      eslint@8.57.0: This version is no longer supported. Please see https://eslint.org/version-support for other options.
      .eslintrc.json  >> eslint.config.mjs

  - ex. 10.3: (5 * 40)
    disappeared on its own in the process:
      [Violation] Added non-passive event listener to a scroll-blocking 'wheel' event. Consider marking event handler as 'passive' to make the page more responsive.

  - ex. 10.4 - 10.5: (4 * 40)
      - app bar
      - item design

  - ex 10.6 - 10.7: (1 * 40)
      - router
      - appBar

  - ex 10.8: (1 * 40)
      - login form
    
  - ex 10.9: (1 * 40)
      - sign in validating

  - ex 10.10: (1 * 40 )
      - Platform-specific code

  - fixed: (4 * 40)
    - ios: invisible avatars.
    - React Router Future Flag Warning
    - ios and android: appbar button name is invisible
    - andoid: bold not works in MyText:
      - bold start from, ios: 500, android: 700.
    - item language style like button ios and android
    - repository item, item description. Indents multiline
    - the description runs of the screen

  - updated (2 * 40)
    - MyText component instead Text or FancyText
    - refactoring

  - working on errors (3 * 40)
    - Bringing app to an example solution part 2 (partly)
    - useFormik vs <Formik> ... useField ... </Formik>
      (useFormik + useField = context problem) 
      according with formik tutorial app (ex. 10.1 - 10.10) was done with useFormik hook, next exercises would be done with component approach according with Example solutions part2

part c: Communicating with server (3 * 40)