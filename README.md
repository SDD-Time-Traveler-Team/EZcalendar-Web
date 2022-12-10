## Getting Started

### Prerequisites

- Install node 16 or later. See [https://nodejs.org/en/](https://nodejs.org/en/)

### Installation

1. Clone this repo
   `git clone https://github.com/SDD-Time-Traveler-Team/EZcalendar-Web.git`
2. Go to `/EZcalendar-Web` and install packages
   `npm install`
3. Run the app
   `npm run start`

### Connect Authentication Service

We use AWS Amplify for authentication. It's included in the AWS free tier.

1. To set up your Auth service, you need to go to [https://aws.amazon.com/amplify/](https://aws.amazon.com/amplify/)
2. Install and configure the Amplify CLI. See instructions at [https://docs.amplify.aws/lib/auth/getting-started/q/platform/js/](https://docs.amplify.aws/lib/auth/getting-started/q/platform/js/)
3. Add Auth service to the app. See instructions at [https://docs.amplify.aws/lib/auth/getting-started/q/platform/js/](https://docs.amplify.aws/lib/auth/getting-started/q/platform/js/)

### Connect the Database

We use PostgreSQL for the project's database. You'll need to set up your own PostgreSQL database server to store your data.

1. Create a PostgreSQL database on your local machine or a cloud service provider.

2. Put key information of the database in environmental variables. You can do it in this way:
   Create `.env` file under `/EZcalendar-Web` folder, and add the following lines to it.

   ```
   DBUSER=your_database_user
   DBHOST=your_database_host_url
   DBDATABASE=your_database_name
   DBPASSWORD=your_database_password
   DBPORT=your_database_port
   ```

3. To apply any changes, you need to restart the app.
