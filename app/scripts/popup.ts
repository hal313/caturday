// TODO: Export as class (need WebPack working for this)
// TODO: Is "global$" required?
/*global $*/

(function() {
    // TODO: Is 'use string' required?
    'use strict';

    $(document).ready(function() {

        const mainImagePlaceholderSelector:string = '#main-image-placeholder';
        const buttonNextSelector:string = '#button-next';        
        
        class API {
            private apis = {
                catAPI: {
                    endpoint: 'http://thecatapi.com/api/images/get'
                },
                rescueGroups: {
                    endpoint: 'https://api.rescuegroups.org/http/v2.json',
                    //endpoint: 'https://test-api.rescuegroups.org/http/v2.json',                    
                    key: 'yJqVTxof'     
                }
            }
            
            getNextCatImageURL() {
                let cacheBust:number = new Date().getTime();
                return `${this.apis.catAPI.endpoint}?format=src&type=gif&cachebust=${cacheBust}`;
            }

            detail(animalID:number) {
                let data = {
                    'apikey': this.apis.rescueGroups.key,
                    'objectType': 'animals',
                    'objectAction': 'publicView',
                    'values': [
                        {
                            'animalID': animalID
                        }
                    ],
                    'fields': [
                        'animalDescription',
                        'animalDescriptionPlain',
                        'animalLocationCitystate',
                        'animalSummary',
                        'animalThumbnailUrl',
                        'animalUrl',
                        'locationAddress',
                        'locationCity',
                        'locationUrl',
                        'locationName',
                        'locationState',
                        'locationPostalcode',
                        'animalVideos',
                        'animalVideoUrls'
                    ]
                };
                
                return $.ajax({
                    url: this.apis.rescueGroups.endpoint,
                    type: 'POST',
                    data: JSON.stringify(data),
                    dataType: 'json',
                    contentType: 'application/json',
                    processData: false
                })
                .then(data => {return data.data[0];});
            }
            
            search(/* TODO: Search for city/state || zipcode */) {
                let data = {
                    'apikey': this.apis.rescueGroups.key,
                    'objectType': 'animals',
                    // 'objectAction': 'define',
                    'objectAction': 'publicSearch',
                    'search': {
                        'resultStart': 0,
                        'resultLimit': 1,
                        // TODO: Allow for larger search range?
                        // TODO: Be sure to use the correct filter
                        // TODO: Allow cat/dog
                        // TODO: Randomly show adoptions
                        // TODO: Organize adoptions better in ui
                        'filterProcessing': '(1 and 2 and 3)',
                        'filters': [
                            {
                                'fieldName': 'animalSpecies',
                                'operation': 'equals',
                                // TODO: Switch back to cat
                                'criteria': 'dog'
                            },
                            
                            // {
                            //     'fieldName': 'locationPostalcode',
                            //     'operation': 'equals',
                            //     'criteria': '14620',
                            // }
                            {
                                'fieldName': 'locationCity',
                                'operation': 'equals',
                                // TODO: Configure
                                'criteria': 'Rochester',
                            },
                            {
                                'fieldName': 'locationState',
                                'operation': 'equals',
                                // TODO: Configure
                                'criteria': 'NY',
                            }                            
                        ],
                        //'fields': ['animalID', 'animalBreed', 'animalName', 'locationUrl', 'animalThumbnailUrl', 'animalUrl', 'animalVideoUrls', 'animalVideos']
                        'fields': ['animalID']
                    }
                };
                
                return $.ajax({
                    url: this.apis.rescueGroups.endpoint,
                    type: 'POST',
                    data: JSON.stringify(data),
                    dataType: 'json',
                    contentType: 'application/json',
                    processData: false
                });
            }
        }
        
        // TODO: Prefetch image, fetch next image when this image shows
        
        let api:API = new API();
        let storage:chrome.storage.SyncStorageArea = chrome.storage.sync;

        let $mainImagePlaceholder:JQuery = $(mainImagePlaceholderSelector);
        let $buttonNext:JQuery = $(buttonNextSelector);


        let clearImage:Function = function():void {
            $mainImagePlaceholder.empty();
        }

        let populateImage:Function = function(url:string):void {
            url = url || api.getNextCatImageURL();
            // A function to populate a cat image
            // clearImage();
            // $mainImagePlaceholder.append(`<img id="main-image" src="${url}">`);
            
            api.search()
            .then(function (data/*, textStatus*/) {
                console.log(data);
                if (!!data && !!data.foundRows) {
                    // TODO: Get the first result
                    clearImage();
                    $.each(data.data, animalId => {
                        console.log('animalId', animalId);
                        api.detail(animalId).then(animal => {
                            console.log('animal', animal);
                            $mainImagePlaceholder.append(`<img id="main-image" src="${animal.animalThumbnailUrl}">${animal.animalDescription}`);
                            console.log(animal.animalDescription);
                        })
                    });
                    // console.log(data.data[1661069]);
                } else {
                    // TODO: Nothing to show
                    $mainImagePlaceholder.append(`<div>no results</div>`);
                }
            });
        }

        // The "next" button handler
        $buttonNext.click(function() {
            populateImage();
        });

        // Populate the image
        populateImage();
    });

})();