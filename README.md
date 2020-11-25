# Magic Potions Assessment

Demo: https://magic-potions.vercel.app/ <br/>
API: https://potions-eg.herokuapp.com/ 

## How to Run Locally
1. Clone repo: `https://github.com/elysiagabe/magic-potions.git`
2. In the **root** directory, install dependencies: `npm install`
3. Run knex migrations: `knex migrate:latest`
4. Seed database: `knex seed:run`
5. Run server on port 5000: `npm run server`
6. In the **client** directory, install dependencies: `yarn`
7. Start app on port 3000: `yarn start`

## Data Schema
Production: PostgreSQL, Devlopment: SQLite

![Data Model](https://i.imgur.com/lLAKTFX.png)

Notes:
* All fields are required except street2 in shipping_info table
* Since customers may only place one order at this time, email address is used to identify customers and therefore must be unique

## API Architecture

The back end was built with Node.js, Express and Knex. I built the API based on RESTful principles using standard HTTP protocols. The API is currently comprised of the following routes: 

#### Monitoring
| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| GET    | `/`                     | All            | Returns a message indicating server is up    |

#### Magic Potions
| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| GET    | `/api/magic`            | All            | Returns all orders in the database.          |
| GET    | `/api/magic/:id`        | All            | Returns the specified order.                 |
| POST   | `/api/magic`            | All            | Creates new order entry and corresponding entries in billing_info, shipping_info & customers.|
| PATCH   | `/api/magic`           | All            | Updates the fulfilled status of the specified order (id of order and fulfilled value are included in the req.body).              |
| DELETE | `/api/magic/:id`       | All            | Deletes the specified order.              |

## Front End Architecture
### Built In: 
React
* Allows developers to create large web applications that are fast, scalable and simple
* Widely used and has a large external library 

Chakra UI
* Component library with focus on accessibility
* Wide variety of components available
* Components are easy to customize and use with other packages

React Hook Form 
* Performant and easy-to-use form validation library
* Small package size without any dependencies
* Utilizies uncontrolled form validation to reduce re-rendering and improve performance
* Faster mounting than other validation libraries
* Ability to change subscriptions to individual input changes without re-rendering entire form (this made it easy to display the total price based on the user's quantity input)
* Works easily with select component library

#### Input validation & Error handling
Chakra UI provides excellent support for refs in their Input components, which are used to register inputs and apply validation rules in React Hook Form. Registration rules in React Hook Form are based on HTML standards and allow for custom validation as well. 

Input validation is handled when form is submitted with React Hook Form's handleSubmit function. If errors are present, error message(s) are displayed to the user under the corresponding input(s). Once user fixes input validation issue, error message is no longer displayed. If no error are present on submission, the input values are passed to a handleOrder function, which then uses those values to create a newOrder object and makes a POST request to the API. Client-side validation allows immediate feedback to the user, creating a better user experience and leading to a higher chance that the order will be submitted successfully. 

Custom Express middleware is also used on the server-side to validate information on the POST request before adding to the database. This ensures information being received is, indeed, valid before storing the new order in the event that client-side restrictions are bypassed. This helps protect against malicious attacks. 

## Final Thoughts
#### What I would do differently
* Given the limited time, I set up very simple input validation that doesn’t necessarily cover all valid cases. For example, customers can’t enter their phone number as (555) 555-5555. I’d do a lot more research into the validation rules I use. 
* I'd reassess the data model and make sure it makes sense. For example, the way the db is set up now, I have the foreign keys that link the customers table with the billing_info and shipping_info tables in the customers table. After thinking more in depth, I’d likely place the a customerID foreign key in both the billing_info and shipping_info table and/or add a shippingID and billingID foreign keys the orders table. If users are granted permission to place multiple orders, this could allow them to have different billing and shipping information saved to their account and associated with each order. 
* Implement media breakpoints and responsive styles for better experience on a small screen
* Reassess and improve file structure
* Add tests

#### Ideas to improve/scale
* Implement TypeScript to catch type errors before they happen
* Add address validation with an external API, like Google’s geocoding API or SmartyStreet
* Add support for international customers (phone number, address fields)
* Add user account creation and authentication
* Integrate with a payment platform, like Stripe or Braintree to handle payment information verification
* Send transactional emails to customer with order confirmation/receipt and shipping information with an email delivery platform, like SendGrid
