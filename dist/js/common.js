$(document).ready(function(){

    var dataChat = [
        {
            type: "bot",
            message: "Добрый день. Меня зовут Бот Феликс. Я быстро ищу информацию об услугах компании и помогаю оформить заявку на выезд специалиста. Просто задайте мне вопрос."
        },
        {
            type: "user",
            message: "Феликс, можно на четверг вызвать замерщика окон?",
            text_processing: [
                {
                    key: null,
                    mess: "Определение интента и выделение сущностей"
                },
                {
                    key: "Интент",
                    mess: "вызвать замерщика"
                },
                {
                    key: "Дата",
                    mess: "30.08.2018"
                }

            ]
        },
        {
            type: "bot",
            message: "На какое время вы хотите вызвать замерщика?"
        },
        {
            type: "user",
            message: "Где-то с двух до пяти.",
            text_processing: [
                {
                    key: null,
                    mess: "Сохранение контекста "
                },
                {
                    key: null,
                    mess: "Уточнение недостающих данных"
                },
                {
                    key: null,
                    mess: "Запрос к сторонней инфосистеме"
                }

            ]
        },
        {
            type: "bot",
            message: "В это время есть свободные мастера. Я готов оформить заявку. Назовите, пожалуйста, адрес."
        }
    ];


    var itemMessage = function(){

        $(".startChat").remove();
        $(".communication").removeClass('startCommunication')

        dataChat.forEach(function(value, currentIndex) {

            setTimeout(function() {
                // console.log(value);

                if(value.type == "bot"){
                    var html = "<div class=\"item-chat bot\">\
                                <div class=\"avatar avatar-bot animated fadeIn\">\
                                <a href=\"#\">\
                                    <img src=\"img/avatars/bot.png\" alt=\"\">\
                                 </a>\
                            </div>\
                            <div class=\"message message-bot animated fadeInRight\">\
                                <span class=\"text_message\">" + value.message + "</span>\
                                <div class=\"triangle\"></div>\
                                </div>\
                            </div>"

                    $(".communication").append(html);
                }

                if(value.type == "user"){
                    var html = "<div class='item-chat user' data-message='"+ currentIndex +"'>\
                                <div class='message message-user animated fadeInLeft'>\
                                    <div class='d-none d-lg-block'>\
                                        <div class='processing'>\
                                            <div class='processing_dot'>\
                                            </div>\
                                            <div class='text_processing'>\
                                            </div>\
                                        </div>\
                                    </div>\
                                    <span class='text_message'>" + value.message + "</span>\
                                    <div class='triangle'></div>\
                                        </div>\
                                <div class='avatar avatar-user animated fadeIn'>\
                                    <a href='#'>\
                                        <img src='img/avatars/user.png' alt=''>\
                                    </a>\
                                </div>\
                            </div>"

                    $(".communication").append(html);

                    setTimeout(function(){
                        lidRobot(currentIndex);
                    },2000)

                }

            }, 3000*currentIndex);
        });
    };

    var lidRobot = function(idMessage){

        dataChat.forEach(function(value, currentIndex) {

            if(value.type == "user" && currentIndex == idMessage){

               $(".item-chat.user[data-message='"+ idMessage +"'] .message .processing .processing_dot").html('<span></span><span></span><span></span><span></span><span></span><span></span>');

                var spanItem = $(".item-chat.user[data-message='"+ idMessage +"'] .message .processing .processing_dot span");


                // Анимация точек
                spanItem.each(function( index, element ) {

                    setTimeout(function() {

                        spanItem.removeClass('checked_span');
                        element.className = " checked_span";

                    },1000*index);

                });

                setTimeout(function(){
                    console.log(typeof value.text_processing);


                    value.text_processing.forEach(function(val, i ){

                        setTimeout(function() {
                            console.log(val);

                            if(!val.key){

                                html = "<span>"+ val.mess +"</span>";

                            }else{
                                html = "<span><b>"+ val.key +"</b> - "+ val.mess +"</span>";
                            }

                            $(".item-chat.user[data-message='"+ idMessage +"'] .message .processing .text_processing").append(html);

                        },1000*i );

                    });

                }, 6000);

            }

        });

    }

    $(".startChat").click(itemMessage);



});