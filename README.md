# John Thomas
We are [johnthomastheband](johnthomastheband.com)

## Building site

New assets must be added to package.json `assets` object for the time being, until `node deploy` is fixed. Deploy is not currently recursive, so all dirs and files must be listed 😞. 

Run `npm run build` to build, and `npm run deploy` to build and deploy to S3.

Serve local src directory with `npm run serve`

### Deployment setup
- Add the following variables as root-level entries to `package.json` for deployment
  - Specify all files under the an array `assets`. Note that filepaths are not recursive, e.g., to upload `img/album`, put entries for `img/` (for all files within the img folder), as well as `img/album` for all files in album folder. All files in `assets` will be uploaded to S3 during the deploy stage.
  - Specify `cloudfrontDistributionId` with the Cloudfront Distributiton ID
  - The `deploymentTitle` is used as a unique identifier for the project
  - The `s3Bucket` is the bucket name, and is required for uploading assets to S3.
  
  ```json
  "assets": [
    "favicon.ico",
    "img/"
  ],
  "cloudfrontDistributionId": "ASD1234",
  "deploymentTitle": "deployment-title",  
  "s3Bucket": "s3-bucket"
  ```

  - Make a copy of `_config.js` and name it `config.js`. The file `config.js` is not placed in source control to avoid commiting private keys to source control.
  - Enter the account information in `config.js`
