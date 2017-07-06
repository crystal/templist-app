# React Notes

### When importing a component from Material UI
1. Go to Material UI docs
2. Find the component I want to use
3. Look at the sample code
4. import the components (or path to the items)
5. paste the import in the file I'm working on
6. copy & paste the code into the render() method

### Files of interest (Wednesday)
- App.jsx: the primary file, if you want to add a new route to the router (to add a new page)
- Main.jsx: anything to do with the header, login dialog, etc
- Pages Folder: About.jsx, template.jsx, home.jsx
- index.html & style.class

### Adding pages w/ react
1. Create the page in the pages folder by duplicating the about page, rename the file
2. Fix all instances of old page name
3. import that page to the app.jsx router at the top
  ```
  import TemplatePage from './pages/template.jsx'
  ```
4. Add a route to the router in app.jsx
  ```
    <Route path="templates/*" component={TemplatePage} />
  ```

### Errors
- Unexpected use of file extension .jsx:
  This is due to my linter settings
