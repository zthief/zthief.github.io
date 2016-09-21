(function() {
    'use strict';

    angular
        .module('app.home')
        .controller('WelcomeController', WelcomeController);

    WelcomeController.$injector = ['WeatherService'];

    function WelcomeController(WeatherService) {
        var vm = this;

        activate();

        function activate() {
            vm.weather = {};
            vm.refresh = refresh;

            function refresh(){
                WeatherService
                    .getWeather()
                    .success(function(response) {
                        vm.weather = response.result;
                    });
            }

            vm.weather = {
                'sk': {
                    'temp': '30',
                    'wind_direction': '北风',
                    'wind_strength': '1级',
                    'humidity': '52%',
                    'time': '12:57'
                },
                'today': {
                    'temperature': '24℃~31℃',
                    'weather': '多云转晴',
                    'weather_id': {
                        'fa': '01',
                        'fb': '00'
                    },
                    'wind': '微风',
                    'week': '星期三',
                    'city': '广州',
                    'date_y': '2016年09月21日',
                    'dressing_index': '热',
                    'dressing_advice': '天气热，建议着短裙、短裤、短薄外套、T恤等夏季服装。',
                    'uv_index': '中等',
                    'comfort_index': '',
                    'wash_index': '较适宜',
                    'travel_index': '较适宜',
                    'exercise_index': '较适宜',
                    'drying_index': ''
                },
                'future': {
                    'day_20160921': {
                        'temperature': '24℃~31℃',
                        'weather': '多云转晴',
                        'weather_id': {
                            'fa': '01',
                            'fb': '00'
                        },
                        'wind': '微风',
                        'week': '星期三',
                        'date': '20160921'
                    },
                    'day_20160922': {
                        'temperature': '24℃~32℃',
                        'weather': '晴',
                        'weather_id': {
                            'fa': '00',
                            'fb': '00'
                        },
                        'wind': '微风',
                        'week': '星期四',
                        'date': '20160922'
                    },
                    'day_20160923': {
                        'temperature': '24℃~33℃',
                        'weather': '晴转多云',
                        'weather_id': {
                            'fa': '00',
                            'fb': '01'
                        },
                        'wind': '微风',
                        'week': '星期五',
                        'date': '20160923'
                    },
                    'day_20160924': {
                        'temperature': '25℃~33℃',
                        'weather': '多云',
                        'weather_id': {
                            'fa': '01',
                            'fb': '01'
                        },
                        'wind': '微风',
                        'week': '星期六',
                        'date': '20160924'
                    },
                    'day_20160925': {
                        'temperature': '25℃~33℃',
                        'weather': '多云',
                        'weather_id': {
                            'fa': '01',
                            'fb': '01'
                        },
                        'wind': '微风',
                        'week': '星期日',
                        'date': '20160925'
                    },
                    'day_20160926': {
                        'temperature': '24℃~33℃',
                        'weather': '晴转多云',
                        'weather_id': {
                            'fa': '00',
                            'fb': '01'
                        },
                        'wind': '微风',
                        'week': '星期一',
                        'date': '20160926'
                    },
                    'day_20160927': {
                        'temperature': '24℃~33℃',
                        'weather': '晴转多云',
                        'weather_id': {
                            'fa': '00',
                            'fb': '01'
                        },
                        'wind': '微风',
                        'week': '星期二',
                        'date': '20160927'
                    }
                }
            };
        }
    }
})();
