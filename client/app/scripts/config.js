/**
 * Created by Amanda on 2/25/2016.
 * Used by Cloudinary
 * Sets up the information used by Cloudinary directives to find uploads
 */

angular.module('iReceptionistApp')
    .config(['cloudinaryProvider', function (cloudinaryProvider) {
    cloudinaryProvider
        .set("cloud_name", "phoenix-sol")
        .set("upload_preset", "phtsmngp");
}]);
