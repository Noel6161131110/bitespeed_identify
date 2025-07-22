<a id="readme-top"></a>


<h1 align="center">Bitespeed Identity Reconciliation</h1>

<p align="center">
  <strong>API to identify users during checkout of ecommerce</strong>
</p>

---

## Built With

[![Nodejs][Nodejs-logo]][Nodejs-url] [![Express][Express-logo]][Express-url]  [![PostgreSQL][PostgreSQL-logo]][PostgreSQL-url]   [![Typescript][Typescript-logo]][Typescript-url] 

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## APIs

- **Identify [POST]** — Identify the user using email, phone number. And list the primary and secondary ids and past info

<p align="right">(<a href="#readme-top">back to top</a>)</p>



---


## Getting Started

Follow the steps below to set up and run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/Noel6161131110/bitespeed_identify.git
cd ecommerce_hrone
```


### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env` File

Create a `.env` file in the root directory with the following content:

```

PORT=3000
NODE_ENV=DEVELOPMENT

DB_USER=USER
DB_HOST=HOST
DB_NAME=NAME
DB_PASSWORD=PASSWORD
DB_PORT=PORT

```


### 4. Run the Development Server

```bash
npm run dev
```

Make sure to run the above command from the **root** of the project folder.



<p align="right">(<a href="#readme-top">back to top</a>)</p>



---



## Project Structure

<pre lang="markdown">

```
.
├── package-lock.json
├── package.json
├── README.md
├── src
│   ├── config
│   │   └── config.ts
│   ├── controllers
│   │   └── identify.ts
│   ├── database
│   │   └── db.ts
│   ├── index.ts
│   ├── migrations
│   │   └── 1753168744630-CreateContact.ts
│   ├── models
│   │   └── contact.ts
│   └── routes
│       └── routes.ts
└── tsconfig.json

```

</pre>



<p align="right">(<a href="#readme-top">back to top</a>)</p>



---


<p align="center"><em>With ❤️ open-source.</em></p>


[Nodejs-logo]: https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white
[Nodejs-url]: https://nodejs.org/en
[Express-logo]: https://img.shields.io/badge/express.js-000000?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://expressjs.com/
[Typescript-logo]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[Typescript-url]: https://www.typescriptlang.org/

[PostgreSQL-logo]: https://img.shields.io/badge/postgresql-4169e1?style=for-the-badge&logo=postgresql&logoColor=white
[PostgreSQL-url]: https://www.postgresql.org/
