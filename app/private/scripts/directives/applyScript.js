'use strict';

/**
 * @ngdoc directive
 * @name playerApp.directive:applyScript
 * @description
 * # applyScript
 */
angular.module('playerApp')
    .directive('applyScript', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                $('.ui .progress').progress();
                $('.course-progress').progress();
                $('.popup-button').popup();
                $('#content-search-filter-accordion').accordion();
                $('.ui.accordion').accordion({ exclusive: false });
                $('.ui.rating')
                    .rating({
                        maxRating: 5
                    }).rating('disable', true);
                $('.dropdown.resource-search-filter').dropdown({
                    useLabels: false,
                    forceSelection: false,
                    label: {
                        duration: 0,
                    },
                    debug: false,
                    performance: true,
                });
                $('.dropdown.course-search-filter').dropdown({
                    useLabels: false,
                    forceSelection: false,
                    label: {
                        duration: 0,
                    },
                    debug: false,
                    performance: true,
                });
                $('.signupMultiple').dropdown({
                    // useLabels: false,
                });
                // $('.ui.radio.checkbox')
                //     .checkbox('attach events', '.toggle.button');
                $('#multi-select-sort').dropdown();
                $('#dropdown-menu-list-header').dropdown({
                    useLabels: false,
                    forceSelection: false,
                    label: {
                        duration: 0,
                    },
                    debug: false,
                    performance: true,
                });

                $('#headerSearch').dropdown();

                if (attrs.id == 'content-video-player-youtube-holder') {
                    var oldPlayer = document.getElementById('content-video-player-youtube');
                    videojs(oldPlayer).dispose();
                    $(element).append('<video id=\'content-video-player-youtube\' height=\'100%\' width=\'100%\' class=\'video-js player-video\' controls  data-setup=\'{ "fluid": true,"techOrder": ["youtube"], "sources": [{ "type": "video/youtube", "src": ""}] }\'></video>');
                    videojs('content-video-player-youtube').ready(function() {
                        var newPlayer = this;
                        newPlayer.src({ type: 'video/youtube', src: attrs.videosrc });
                        scope.initVideoEvents(this);
                    });
                } else if (attrs.id == 'content-video-player-holder') {
                    var oldPlayer = document.getElementById('content-video-player');
                    videojs(oldPlayer).dispose();
                    $(element).append('<video id=\'content-video-player\' height=\'100%\' width=\'100%\' class=\'video-js player-video\' controls  data-setup=\'{ "controls": true}\'></video>');
                    videojs('content-video-player').ready(function() {
                        var newPlayer = this;
                        newPlayer.src({ type: attrs.videotype, src: attrs.videosrc });
                        scope.initVideoEvents(this);
                    });
                }

                $('#example2').calendar({
                    type: 'date',
                    formatter: {
                        date: function(date, settings) {
                            if (!date)
                                return '';
                            var day = date.getDate();
                            var month = date.getMonth() + 1;
                            var year = date.getFullYear();
                            return day + '/' + month + '/' + year;
                        }
                    }
                });
                $('#rangestart').calendar({
                    type: 'date',
                    endCalendar: $('#rangeend'),
                    formatter: {
                        date: function(date, settings) {
                            if (!date)
                                return '';
                            var day = date.getDate();
                            var month = date.getMonth() + 1;
                            var year = date.getFullYear();
                            return day + '/' + month + '/' + year;
                        }
                    }
                });
                $('#rangeend').calendar({
                    type: 'date',
                    startCalendar: $('#rangestart'),
                    formatter: {
                        date: function(date, settings) {
                            if (!date)
                                return '';
                            var day = date.getDate();
                            var month = date.getMonth() + 1;
                            var year = date.getFullYear();
                            return day + '/' + month + '/' + year;
                        }
                    }
                });

                $('#start').calendar({
                    type: 'date',
                    endCalendar: $('#start'),
                    formatter: {
                        date: function(date, settings) {
                            if (!date) return '';
                            var day = date.getDate();
                            var month = date.getMonth() + 1;
                            var year = date.getFullYear();
                            return day + '/' + month + '/' + year;
                        }
                    }
                });
                $('#end').calendar({
                    type: 'date',
                    startCalendar: $('#end'),
                    formatter: {
                        date: function(date, settings) {
                            if (!date) return '';
                            var day = date.getDate();
                            var month = date.getMonth() + 1;
                            var year = date.getFullYear();
                            return day + '/' + month + '/' + year;
                        }
                    },
                    onChange: function(date, text) {
                        angular.element($('#endDateInput').val(text)).triggerHandler('input');
                        // $('#endDateInput').val(text);
                    },
                });
                $('#rangestartAdd').calendar({
                    type: 'date',
                    endCalendar: $('#rangeendAdd'),
                    formatter: {
                        date: function(date, settings) {
                            if (!date) return '';
                            var day = date.getDate();
                            var month = date.getMonth() + 1;
                            var year = date.getFullYear();
                            var selectedDate = day + '/' + month + '/' + year;
                            // profile.user.dob = selectedDate;
                            return selectedDate;
                        }
                    }
                });
                $('#rangeendAdd').calendar({
                    type: 'date',
                    startCalendar: $('#rangestartAdd'),
                    formatter: {
                        date: function(date, settings) {
                            if (!date) return '';
                            var day = date.getDate();
                            var month = date.getMonth() + 1;
                            var year = date.getFullYear();
                            var selectedDate = day + '/' + month + '/' + year;
                            // profile.user.dob = selectedDate;
                            return selectedDate;
                        }
                    }
                });

                $('#rangeStart').calendar({
                    type: 'date',
                    endCalendar: $('#rangeEnd'),
                    formatter: {
                        date: function(date, settings) {
                            if (!date) return '';
                            var day = date.getDate();
                            var month = date.getMonth() + 1;
                            var year = date.getFullYear();
                            return day + '/' + month + '/' + year;
                        }
                    }
                });
                $('#rangeEnd').calendar({
                    type: 'date',
                    startCalendar: $('#rangeStart'),
                    formatter: {
                        date: function(date, settings) {
                            if (!date) return '';
                            var day = date.getDate();
                            var month = date.getMonth() + 1;
                            var year = date.getFullYear();
                            return day + '/' + month + '/' + year;
                        }
                    }
                });

                $('#editDob').calendar({
                    type: 'date',
                    formatter: {
                        date: function(date, settings) {
                            if (!date) return '';
                            var day = date.getDate();
                            var month = date.getMonth() + 1;
                            var year = date.getFullYear();
                            var selectedDate = day + '/' + month + '/' + year;
                            // profile.user.dob = selectedDate;
                            return selectedDate;
                        }
                    }
                });
                var sampleData = [{
                        'id': 1,
                        'name': 'Appetizers',
                        'nodes': [
                            { 'id': 110, 'name': 'Jalapenos Nachos' },
                            {
                                'id': 120,
                                'name': 'Quesadilla',
                                'nodes': [
                                    { 'id': 121, 'name': 'with Cheese' },
                                    { 'id': 122, 'name': 'with Beef' },
                                    { 'id': 123, 'name': 'with Chiclen' }
                                ]
                            },
                            { 'id': 130, 'name': 'Toquitos Chicken or Beef' },
                            {
                                'id': 140,
                                'name': 'Chips',
                                'nodes': [
                                    { 'id': 141, 'name': 'with Cheese' },
                                    { 'id': 142, 'name': 'with Cheese & Beans' }
                                ]
                            }
                        ]
                    },

                    {
                        'id': 2,
                        'name': 'Tacos',
                        'nodes': [
                            { 'id': 210, 'name': 'Carnitas', nodes: [] },
                            { 'id': 220, 'name': 'Carne Asada' },
                            { 'id': 230, 'name': 'Chicken', nodes: [] },
                            { 'id': 240, 'name': 'Shredded Beef' },
                            { 'id': 250, 'name': 'Al Pastor' },
                            { 'id': 260, 'name': 'Crispy Potato' }
                        ]
                    },

                    {
                        'id': 3,
                        'name': 'Breakfast',
                        'nodes': [
                            { 'id': 310, 'name': 'Huevos Rancheros' },
                            { 'id': 320, 'name': 'Machaca Plate' },
                            { 'id': 330, 'name': 'Hievos a la Mexicana' },
                            { 'id': 340, 'name': 'Chile Verde Omelette' }
                        ]
                    }
                ];
                $('#openTreeModal').treePicker({
                    data: sampleData,
                    name: 'EDIT PROFILE',
                    singlePick: true,
                    onSubmit: function(nodes) {
                        console.log(nodes);
                    },
                    displayFormat: function() {
                        $('.ui.blue.button.accept').html('Done');
                        $('.ui.button.close').html('Close');
                    }

                });
            }
        };
    });