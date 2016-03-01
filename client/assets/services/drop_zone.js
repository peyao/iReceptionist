/**
 * Created by Amanda on 3/1/2016.
 * Factory for instantiating Dropzones for uploading pictures
 *
 * Usage:
 *  HTML:
 *  <div id="avatarUpload" class="dropzone">
 *      <div class="dz-default dz-message"></div>
 *  </div>
 *
 *  JS:
 *  $scope.avatarUpload = DropZone.createNew('#avatarUpload');
 */

angular.module('iReceptionistApp')
    .factory('DropZone', function() {
        return {
            createNew: function(click){
                var newDropZone = new Dropzone(click, {
                    uploadMultiple: false,
                    parallelUploads: 1,
                    maxFiles: 1,
                    previewTemplate: '<div id="preview-template">'+
                                        '<div class="dz-preview dz-image-preview">' +
                                            '<div class="dz-image">' +
                                                '<img data-dz-thumbnail />' +
                                            '</div>' +
                                            '<button data-dz-remove class="btn btn-xs btn-danger rmv-upload" >' +
                                                '<i class="fa fa-times"></i>' +
                                            '</button>' +
                                        '</div>' +
                                    '</div>',
                    clickable: click,
                    url: "https://api.cloudinary.com/v1_1/phoenix-sol/image/upload"
                });
                newDropZone.on('sending', function (file, xhr, formData) {
                    console.log("sending test");
                    formData.append('api_key', 652212869154129);
                    formData.append('timestamp', Date.now() / 1000 | 0);
                    formData.append('upload_preset', 'phtsmngp');
                });
                newDropZone.on('success', function (file, response) {
                    console.log('Success! Cloudinary public ID is', response.public_id);
                });
                newDropZone.on('maxfilesexceeded', function(file){
                    newDropZone.removeAllFiles();
                    newDropZone.addFile(file);
                });
                newDropZone.on("addedfile", function(file) {
                    file.previewElement.addEventListener("click", function() {
                        newDropZone.hiddenFileInput.click()
                    });
                });
                return newDropZone;
            }
        };
    });