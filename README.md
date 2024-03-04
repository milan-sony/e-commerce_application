###### #LearnNodeJS

# E-Commerce Application

An E-Commerce Application build with Node.js, Express.js, Handlebars , AJAX and MongoDB

<details>
<summary><b>⏳ Timeline</b></summary>

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

- cart product quantity increased and decreased

## Day 9

📆 01/03/2024

- Product removed from cart
- product checkout page created

## Day 10

📆 02/03/2024

- Total price added on `place_order.hbs` page
- Total price added on `cart.hbs`
- payment methods created
- Order collection created and product removed from `cart`
- product details listed on `orders.hbs`
- product checkout created
- Cart error fixed
- Admin view all users added
- Admin search product

</details>

<details>
<summary><b>⚙ Run locally</b></summary>

You will need to install Node.js and MongoDB on you system

Head over to https://nodejs.org/en to download Node.js

Head over to https://www.mongodb.com/try/download/community to download MongoDB community server

Make sure Node and NPM are installed and their PATHs defined

Once you have downloaded Node.js and MongoDB run the following command (clone this project)

```bash
  https://github.com/milan-sony/e-commerce_application.git
```

Then go to the project folder

```bash
  cd e-commerce_application
```

Install the dependencies/ packages needed for this project

```bash
  npm install
```

Once the packages are installed run

```bash
  npm start
```

Then head over to a browser and type

```bash
  localhost:3000
```
    
</details>
