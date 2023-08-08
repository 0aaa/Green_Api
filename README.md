#   G r e e n _ A p i <br><br>

 Требования.<br>
1. Node JS (рекомендуемая версия 18.17.0) [https://nodejs.org/download/release/latest-v18.x/] ;<br>
2. Erlang/OTP (рекомендуемая версия 26.0.2) [https://www.erlang.org/patches/otp-26.0.2] ;<br>
3. RabbitMQ (рекомендуемая версия 3.12.2) [https://www.rabbitmq.com/download.html] .<br><br>

 Механика проекта.<br>
1. При запуске происходит вызов микросервисов M1 и M2 ;<br>
2. Микросервис M1 производит запуск сервера, доступного по адресу [http://127.0.0.1:8080/] ;<br>
3. Микросервис M2 ожидает сообщений в очереди № 1 RabbitMQ ;<br>
4. При поступлении HTTP-запроса микросервис M1 отправляет содержимое запроса в очередь № 1 RabbitMQ ;<br>
5. Микросервис M2 читает содержимое очереди № 1 RabbitMQ ;<br>
6. Микросервис M2 помещает полученное содержимое в очередь № 2 RabbitMQ ;<br>
7. Микросервис M1 читает содержимое очереди № 2 RabbitMQ ;<br>
8. Завершение программы.<br><br>

 Инструкция по локальному развертыванию проекта.<br>
1. Win + R -> выполнить команду CMD -> перейти в директорию для развёртывания проекта с помощью команды [CD] ;<br>
2. Выполнить команду [git clone https://github.com/0aaa/Green_Api] ;<br>
3. Выполнить команду [CD Green_Api] ;<br>
4. Выполнить команду [NODE .] . Произойдёт вызов микросервисов M1 и M2 ;<br>
5. Выполнить запрос [localhost:8080] в браузере .
