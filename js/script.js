$(document).ready(function() {
    var timeFormat = $('.js-clock').data('time-format');
    var timeType = $('.js-clock').data('type');
    var timezoneOffset = $('.js-clock').data('timezone-offset');
    var currentTime = $('.js-clock').data('current-time');

    if(timezoneOffset >= 13 || timezoneOffset <= -13){
        alert('TimeZone Error!');
    }

    if(timeFormat != 12 && timeFormat != 24){
        alert('Time Format Error!');
    }

    if(timeType == 'server-time'){
        var time = $('.js-current-time>span').html();
        var houres = time.substring(7,9);
        var minutes = time.substring(10,12);
        var seconds = time.substring(13,15);
        var timezone = time.substring(0,3);
        seconds = parseInt(seconds);
        houres = parseInt(houres);
        timezone = parseInt(timezone);
        minutes = parseInt(minutes);
    }else{
        var minutes = new Date().getMinutes();
        var seconds = new Date().getSeconds();
        var houres = new Date().getHours();
    }

    if(currentTime != undefined){
        var toggle = true;
        if(parseInt(currentTime.substring(0,2)) >= 24 || parseInt(currentTime.substring(3,5)) >= 60){
            alert('Current Time error');
            toggle = false;
        }
        if(toggle){
            houres = currentTime.substring(0,2);
            minutes = currentTime.substring(3,5);
            houres = parseInt(houres);
            minutes = parseInt(minutes);
            seconds = 0;
        }
    }


    if(timezoneOffset != undefined){
        timezoneOffset = parseInt(timezoneOffset);
        houres = houres + timezoneOffset;
    }
    //    +02:00 16:52:14

    function secondTick(){
        if(seconds+1 == 60){
            seconds = 0;
            if(minutes+1 == 60){
                minutes = 0;
                if(houres+1 == 24){
                    houres = 0;
                    minutes = 0;
                    seconds = 0;
                }else{
                    houres++;
                }
            }else{
                minutes++;
            }
        }else{
            seconds++;
        }
        if(houres <=9){
            $('.js-hour').html('0' + houres);
        }else{
            if(timeFormat == 12 && houres >= 13){
                houres = houres - 12;
                if(houres <= 9){
                    $('.js-hour').html('0' + houres);
                }else{
                    $('.js-hour').html(houres);
                }
            }else{
                $('.js-hour').html(houres);
            }
        }
        if(minutes<=9){
            $('.js-minutes').html('0' + minutes);
        }else{
            $('.js-minutes').html(minutes);
        }
        if(seconds <= 9){
            $('.js-seconds').html('0' + seconds);
        }else{
            $('.js-seconds').html(seconds);
        }
        setTimeout(function(){
            secondTick();
        }, 1000);
    }

    secondTick();


});