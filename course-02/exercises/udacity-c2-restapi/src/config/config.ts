export const config = {
  "dev": {
    "username": 'udagram',
    "password": '123bright%^*',
    "database": 'udagram',
    "host": 'udagram.cmh6oagnugu1.us-east-1.rds.amazonaws.com',
    "dialect": "postgres",
    "aws_region": 'us-east-2',
    "aws_profile": 'default',
    "aws_media_bucket": 'udagram-ruttner-dev'
  },
  "jwt": {
    "secret": " "
  },
  "prod": {
    "username": "",
    "password": "",
    "database": "udagram_prod",
    "host": "",
    "dialect": "postgres"
  }
}


// export const config = {
//   "dev": {
//     "username": process.env.POSTGRES_USERNAME,
//     "password": process.env.POSTGRES_PASSWORD,
//     "database": process.env.POSTGRES_DATABASE,
//     "host": process.env.POSTGRES_HOST,
//     "dialect": "postgres",
//     "aws_region": process.env.AWS_REGION,
//     "aws_profile": process.env.AWS_PROFILE,
//     "aws_media_bucket": process.env.AWS_MEDIA_BUCKET
//   },
//   "jwt": {
//     "secret": " "
//   },
//   "prod": {
//     "username": "",
//     "password": "",
//     "database": "udagram_prod",
//     "host": "",
//     "dialect": "postgres"
//   }
// }
