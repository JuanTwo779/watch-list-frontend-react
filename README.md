Overview
- front end of watch list application
- hosted using Amazon S3 bucket

Installed dependencies
- axios
- boostrap + react-bootstrap
- formik
- moment
- react-dom
- react-router-dom

Bucket policy (Allow access to all files in bucket)
"Statement": [
     {
          "Sid": __,
          "Principal": "*",
          "Effect": "Allow",
          "Action": "s3:GetObject",
          "Resource": arn:aws:s3:::BUCKET-NAME/*"
     }
]
