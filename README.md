###### #LearnNodeJS

# E-Commerce Application

An E-Commerce Application build with Node.JS, Express and MongoDB

## Day 1 
📅 20/01/2024

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

## Day 2

📅 21/02/2024

- Mongoose Connected
    
    ```jsx
    const mongoose = require('mongoose');
    const url = "mongodb://127.0.0.1:27017/mydb";
    
    module.exports = {
    
        connect: () => {
            mongoose.connect(url)
            .then(() => {
                console.log("Connected to MongoDB\n");
            }).catch((error) => {
                console.log(error);
            });
        },
    
        collection: (name) => {
            return mongoose.connection.db.collection(name);
        }
    
    };
    ```
    
    This code exports an object with two methods, **`connect`** and **`collection`**, using Node.js CommonJS module system. Let's break down each part:
    
    1. **Importing Mongoose**:
        
        ```jsx
        const mongoose = require('mongoose');
        ```
        
        This line imports the Mongoose library, which allows interaction with MongoDB databases using an object modeling approach.
        
    2. **Defining MongoDB URL**
        
        ```jsx
        const url = "mongodb://127.0.0.1:27017/mydb";
        ```
        
        This line defines the URL used to connect to the MongoDB database. It specifies the protocol (**`mongodb://`**), the host (**`127.0.0.1`** or **`localhost`**), the port (**`27017`**), and the name of the database (**`mydb`**).
        
    3. **Exporting Module**:
        
        ```jsx
        module.exports = {
            // methods...
        };
        ```
        
        This code exports an object containing methods using **`module.exports`**, making these methods accessible to other parts of the application.
        
    4. **Connect Method**:
        
        ```jsx
        connect: () => {
            mongoose.connect(url)
            .then(() => {
                console.log("Connected to MongoDB\n");
            }).catch((error) => {
                console.log(error);
            });
        },
        ```
        
        This method establishes a connection to the MongoDB database specified by the URL. It uses **`mongoose.connect()`** to connect to MongoDB asynchronously. If the connection is successful, it logs a success message to the console. If there's an error during the connection process, it logs the error.
        
    5. **Collection Method**:
        
        ```jsx
        collection: (name) => {
            return mongoose.connection.db.collection(name);
        }
        ```
        
        This method returns a MongoDB collection object based on the provided collection name. It uses **`mongoose.connection.db.collection(name)`** to access the specified collection through the Mongoose connection.
        
        Overall, this module provides a way to connect to a MongoDB database and access collections within that database using Mongoose. Other parts of the application can import this module and use its methods to interact with the database.
        
- `helper` folder created for products
- product details added to database
- product image saved to `product_image` folder in `public` folder

⚠ Error occurred: image is not displayed from `product_image` folder

## Day 3

📅 22/02/2024

- Error fixed image is displayed from the `product_image` folder
- product data added to user side
- user login and signup page created
- user signup data saved to db
- user login and page redirected
- user session created
- user logout

## Day 4

📅 23/02/2024

- user valid or invalid checked
- cart page created
- middleware created for checking the user login
- product deleted from admin side

## Day 5

📅 25/02/2024

- product details displayed on another page for editing
- product details updated and image changed
- user signup session created
- working on add to cart

## Day 7

📅 28/02/2024

- Add to cart count updated with Ajax
- cart item and quantity displayed

## Day 8

📅 29/02/2024

- cart quantity increased and decreased