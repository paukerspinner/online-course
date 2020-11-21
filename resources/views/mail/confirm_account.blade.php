<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        .container {
            margin: 0 auto;
            padding: 2rem;
            max-width: 400px;
            text-align: center;
            background: #f0f0f0;
        }
        .warning {
            color: red;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Thanks for signing up!</h1>
    <p>
        Please verify your email address to get access to our course. Your verification code is
        <strong>{{$verification_code}}.</strong>
    </p>
    <p class="warning">This verification code expires after 5 minutes.</p>
</div>
</body>
</html>