###### #LearnNodeJS

# E-Commerce Application

An E-Commerce Application build with Node.JS, Express and MongoDB

## Day1 📅 20/01/2024

- index page created
- layout folder created
- partial folder created
- libraries installed
    - `npm install nodemon` auto restart server
    - `npm install express-handlebars` for adding layout and partial folder
        - To set the path of layout and partial folder (inside `app.js`)
            
            ```jsx
            app.engine('hbs', hbs.engine({
              extname: 'hbs',
              defaultLayout: 'layout',
              layoutsDir: __dirname + '/views/layout/',
              partialsDir: __dirname + '/views/partials'
            }));
            ```
            
    - `npm install express-fileupload` file upload
        
        ```jsx
        app.use(fileUpload());
        ```
        
- added products to the index page by passing a products object and displayed using `hbs` template
- create separate page for admin and user
- admin panel created
- added products to the admin panel by passing a products object and displayed it in table format
- added add new product form for admin
